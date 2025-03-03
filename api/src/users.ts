import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import middy from "@middy/core";
import attachUserInfos from "./middlewares/attachUserInfos";
import { requireAdmin } from "./middlewares/requireRole";
import { httpReturn } from "./utils";
import { UserRole, USER_ROLES, User } from "shared/User";
import { listCognitoUsers, getUserGroups, removeUser, retrieveUser, addUserToGroup, addUserToCognito, updateUserGroup } from "./helpers/cognito";

/** handlers */
export async function fetchUsers() {
  const data = await listCognitoUsers();
  const users: User[] = ( data.Users|| []).filter((u) => u.Enabled).map((u) => {
    const { Username: username, Enabled: enabled, UserStatus: userStatus } = u;
    const idAttribute = u?.Attributes?.find((attr) => attr.Name === "sub");
    const emailAttribute = u?.Attributes?.find((attr) => attr.Name === "email");
    const id = idAttribute?.Value;
    const email = emailAttribute?.Value;
    return {
      userId: id,
      username,
      email,
      enabled,
      userStatus,
    };
  }) || [];
  return Promise.all(
    (users || []).map(async (user) => {
      if (user && user.userId) {
        const groups = await getUserGroups(user.userId) as;
        user.groups = groups;
        return {
          ...user,
          groups,
        };
      }
      return user;
    }),
  );
}
async function getUsersHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const users = await fetchUsers();
  return httpReturn(200, users);
}

async function createUserHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const body = JSON.parse(event.body || "");
  if (!body) {
    return httpReturn(400, { error: "missing body in request" });
  }
  const { email, userRole } = body;
  if (!email) {
    return httpReturn(400, { error: `${"email"} is required` });
  }
  const userData = await addUserToCognito(email);
  if (userData["$metadata"].httpStatusCode !== 200) {
    return httpReturn(userData["$metadata"].httpStatusCode, userData);
  }
  if (!!userRole && !USER_ROLES.includes(userRole as UserRole)) {
    return httpReturn(400, { error: `${userRole} is not a valide userRole` });
  }
  if (userData["$metadata"].httpStatusCode !== 200) {
    return httpReturn(userData["$metadata"].httpStatusCode, userData);
  }
  if (userRole) {
    await addUserToGroup(userData.User.Username, userRole);
  }
  const retrievedUser = await retrieveUser(userData.User.Username);
  const groups = await getUserGroups(userData.User.Username);
  const user = Object.assign({}, retrievedUser, { groups });
  return httpReturn(200, user);
}

async function deleteUserHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const { userName } = event.pathParameters as any;
  if (!userName) {
    return httpReturn(400, { error: "username is required" });
  }
  const d: any = await removeUser(userName);
  if (d.statusCode !== 200) {
    return httpReturn(d.statusCode, d);
  }
  return httpReturn(200, d);
}

async function updateUserHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const { userName } = event.pathParameters as any;
  if (!userName) {
    return httpReturn(400, { error: "username is required" });
  }
  const body = JSON.parse(event.body || "");
  if (!body) {
    return httpReturn(400, { error: "missing body in request" });
  }
  const { userRole } = body;
  if (!!userRole && !USER_ROLES.includes(userRole as UserRole)) {
    return httpReturn(400, { error: `${userRole} is not a valide userRole` });
  }
  const result = await updateUserGroup(userName, userRole);
  return httpReturn(200, result);
}

export const updateUser = middy().use([attachUserInfos(), requireAdmin()]).handler(updateUserHandler);

export const createUser = middy().use([attachUserInfos(), requireAdmin()]).handler(createUserHandler);
export const deleteUser = middy().use([attachUserInfos(), requireAdmin()]).handler(deleteUserHandler);
export const getUsers = middy().use([attachUserInfos(), requireAdmin()]).handler(getUsersHandler);
