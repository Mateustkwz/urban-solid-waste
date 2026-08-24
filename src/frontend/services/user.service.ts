import authService from "@backend-services/auth.service";
import { User } from "@frontend-types/user.type";

const login = async (document: string, password: string) => {
  const result = await authService.userAuthentication(document, password);

  return result;
};

const register = async (user: User) => {
  await authService.createAccount(user);
};

export { login, register };
