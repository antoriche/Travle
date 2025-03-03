export type User = {
  email: string;
  username: string;
  userStatus: string;
  userId: string;
  groups?: UserRole[];
  enabled: boolean;
};

export type UserRole = "ADMIN";

export const USER_ROLES: UserRole[] = ["ADMIN"];
