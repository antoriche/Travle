import { Amplify } from "aws-amplify";

export default function configureAuth() {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID!,
        userPoolClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID!,
      },
    },
  });
}
