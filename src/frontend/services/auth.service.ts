import authService from "@backend-services/auth.service";
import { User } from "@frontend-types/user.type";

const login = async (document: string, password: string) => {
  return authService.userAuthentication(document, password);
};

const register = async (user: User) => {
  await authService.createAccount(user);
};

const logout = async (userId: string) => {
  return await authService.logout(userId);
};

const checkSessionValidity = async (userId: string) => {
  return await authService.checkTokenValidity(userId);
};

export { checkSessionValidity, login, logout, register };
