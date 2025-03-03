import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const requiredAttribute = (attribute: string, queryStringParameters: { [key: string]: unknown }) => {
  if (queryStringParameters[attribute] === undefined) {
    throw new Error(`${attribute} is required`);
  }
};

export const extractUserFromRequest = (event: APIGatewayProxyEvent): { userName: string | undefined } => {
  const claims = event?.requestContext?.authorizer?.claims;
  const userName = claims["cognito:username"];
  return { userName };
};

export const httpReturn = (code: number, body: any): APIGatewayProxyResult => {
  return {
    statusCode: code,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};

export function generateRandomString(stringLength: number): string {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < stringLength) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
