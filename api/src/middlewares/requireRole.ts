import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { extractUserIdFromEvent } from "./attachUserInfos";
import { getUserGroups } from "../helpers/cognito";

const requireRole = (role: string): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<void | any> => {
    const { event } = request;
    const userId = extractUserIdFromEvent(event);
    const groups = await getUserGroups(userId);
    if (!groups) {
      return {
        statusCode: 403,
        body: "Unauthorized",
      };
    }
    if (groups.length === 0) {
      return {
        statusCode: 403,
        body: "Unauthorized",
      };
    }
    if (!groups.includes("ADMIN")) {
      return {
        statusCode: 403,
        body: "Unauthorized",
      };
    }
  };
  return {
    before,
  };
};

const requireAdmin = () => requireRole("ADMIN");

export { requireAdmin };
