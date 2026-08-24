import { UserSchema } from "@storage/user.storage";

export const searchUserById = (userData: string, userId: string) => {
  const users = JSON.parse(userData) as UserSchema;

  const user = Object.entries(users["@user"]).find(
    (item) => item[1].id === userId,
  );

  return user ? { ...user[1] } : null;
};
