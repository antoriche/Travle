import axios, { AxiosRequestConfig } from "axios";
import { shouldSkipAuth } from "../App";
import * as Auth from "aws-amplify/auth";

export async function getAPI(config: AxiosRequestConfig = {}) {
  let token;
  if (!shouldSkipAuth()) {
    const session = await Auth.fetchAuthSession();
    token = session.tokens?.accessToken.toString();
  }
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: token && `Bearer ${token}`,
      ...(config.headers || {}),
    },
  });
}
