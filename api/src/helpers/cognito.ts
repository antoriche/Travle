import {
  CognitoIdentityProviderClient,
  AdminListGroupsForUserCommand,
  AdminDeleteUserCommand,
  AdminGetUserCommand,
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  ListUsersCommand,
  AdminRemoveUserFromGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { generateRandomString } from "../utils";
export async function getUserGroups(userName: string): Promise<string[]> {
  const client = new CognitoIdentityProviderClient();
  const command = new AdminListGroupsForUserCommand({
    UserPoolId: process.env.boilerplate_COGNITO_USER_POOL_ID,
    Username: userName,
  });
  const response = await client.send(command);
  if (response && response.Groups && response.Groups.length > 0) {
    const groups = response.Groups.map((g) => g && g.GroupName).filter((g) => g !== undefined);
    return groups;
  }
  return [];
}

export async function removeUser(userName: string) {
  const client = new CognitoIdentityProviderClient();
  const command = new AdminDeleteUserCommand({
    UserPoolId: process.env.boilerplate_COGNITO_USER_POOL_ID,
    Username: userName,
  });
  const response = await client.send(command);
  return response;
}

export async function retrieveUser(userName: string) {
  const client = new CognitoIdentityProviderClient();
  const command = new AdminGetUserCommand({
    UserPoolId: process.env.boilerplate_COGNITO_USER_POOL_ID,
    Username: userName,
  });
  const response = await client.send(command);
  return response;
}

export async function addUserToGroup(userName: string, groupName: string) {
  const client = new CognitoIdentityProviderClient();
  const command = new AdminAddUserToGroupCommand({
    UserPoolId: process.env.boilerplate_COGNITO_USER_POOL_ID,
    Username: userName,
    GroupName: groupName,
  });
  const response = await client.send(command);
  return response;
}

export async function addUserToCognito(email: string): Promise<any> {
  const client = new CognitoIdentityProviderClient();
  const command = new AdminCreateUserCommand({
    UserPoolId: process.env.boilerplate_COGNITO_USER_POOL_ID,
    Username: email,
    TemporaryPassword: "TempPassw0rd!" + generateRandomString(8),
    DesiredDeliveryMediums: ["EMAIL"],
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
  });
  const response = await client.send(command);
  return response;
}
export async function listCognitoUsers() {
  const client = new CognitoIdentityProviderClient();
  const command = new ListUsersCommand({
    UserPoolId: process.env.boilerplate_COGNITO_USER_POOL_ID,
    AttributesToGet: ["sub", "email"],
  });
  const response = await client.send(command);
  return response;
}

export async function removeUserFromGroup(userName: string, groupName: string) {
  const client = new CognitoIdentityProviderClient();
  const command = new AdminRemoveUserFromGroupCommand({
    UserPoolId: process.env.boilerplate_COGNITO_USER_POOL_ID,
    Username: userName,
    GroupName: groupName,
  });
  const response = await client.send(command);
  return response;
}

export async function updateUserGroup(userName: string, groupName: string | null) {
  const currentGroups = await getUserGroups(userName);
  if (currentGroups && currentGroups.length > 0) {
    await Promise.all(currentGroups.map((g: string) => removeUserFromGroup(userName, g)));
  }
  if (groupName) {
    const result = await addUserToGroup(userName, groupName);
    return result;
  }
  return null;
}
