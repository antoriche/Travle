import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export function setCorsHeaders(
  event: APIGatewayProxyEvent,
  ctx: AWSLambda.Context & {
    end: () => void;
    prev: APIGatewayProxyResult;
  },
) {
  return {
    ...ctx.prev,
    headers: {
      ...(ctx.prev.headers ?? {}),
      "Access-Control-Allow-Origin": `https://${process.env.APIENV_APP_DOMAIN}`,
    },
  };
}
