import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export function extractUserIdFromEvent(event: APIGatewayProxyEvent): string {
  // middy is not able to handle the process.env variables in the same way as the lambda function
  // simply pass boilerplate_USER_ID as an env variable to have access to the userId while in development mode
  if (process.env.DEVELOPMENT_MODE && process.env.DEVELOPMENT_MODE === "true") {
    return process.env.boilerplate_USER_ID || "";
  }
  return event.requestContext?.authorizer?.claims.sub;
}

function assignUserIdToEvent(event: APIGatewayProxyEvent, userId: string): APIGatewayProxyEvent {
  const claims = event.requestContext?.authorizer?.claims || {};
  claims.userId = userId;
  event.requestContext = {
    ...event.requestContext,
    authorizer: {
      ...event.requestContext.authorizer,
      claims,
    },
  };
  return event;
}

const attachUserInfos = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<void> => {
    const { event } = request;
    const userId = extractUserIdFromEvent(event);
    const newEvent = assignUserIdToEvent(event, userId);
    request.event = newEvent;
  };
  return {
    before,
  };
};

export default attachUserInfos;
