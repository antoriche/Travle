import * as Auth from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { shouldSkipAuth } from "../App";
import { User } from "shared/User";

export const useUser = (): Partial<User> => {
  const [user, setUser] = useState<Partial<User>>();
  useEffect(() => {
    if (shouldSkipAuth()) return;
    Promise.all([Auth.fetchAuthSession(), Auth.fetchUserAttributes()]).then(([session, attrs]) => {
      const groups: Array<string> = session.tokens?.accessToken.payload["cognito:groups"] as Array<string>;
      console.log(user);
      setUser({
        userId: attrs.sub!,
        email: attrs.email!,
        username: attrs.email!,
      });
    });
  }, []);
  return user || {};
};
