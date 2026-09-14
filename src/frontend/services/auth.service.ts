import AsyncStorage from "@react-native-async-storage/async-storage";

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

async function saveToken(token: string) {
  await AsyncStorage.setItem("sessionToken", token);
}

async function getToken() {
  return await AsyncStorage.getItem("sessionToken");
}

async function clearToken() {
  await AsyncStorage.removeItem("sessionToken");
}

export {
  checkSessionValidity, clearToken, getToken, login,
  logout,
  register,
  saveToken
};

