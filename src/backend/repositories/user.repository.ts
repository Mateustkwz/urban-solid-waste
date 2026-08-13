import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "@backend-types/user.type";
import { UserRole } from "@constants/common";
import { UserSchema } from "../models/user.model";

const getUserByDocument = async (
  cpfOrCnpj: string,
  role: UserRole,
): Promise<UserSchema[`${string}`] | null> => {
  const data = await AsyncStorage.getItem(`@${role}`);

  if (!data) {
    return null;
  }

  const users = JSON.parse(data) as UserSchema;

  return users[cpfOrCnpj] ?? null;
};

const checkExists = async (
  cpfOrCnpj: string,
  role: UserRole,
): Promise<boolean> => {
  const user = await getUserByDocument(cpfOrCnpj, role);

  return user !== null;
};

const saveUser = async (user: User) => {
  const key = `@${user.role}`;
  const data = await AsyncStorage.getItem(key);

  const users = data ? (JSON.parse(data) as UserSchema) : {};

  users[user.cpfOrCnpj] = {
    ...user,
    cpf_or_cnpj: user.cpfOrCnpj,
    points: user.points ?? 0,
  };

  await AsyncStorage.setItem(key, JSON.stringify(users));
};

const getCurrentUser = async (): Promise<User | null> => {
  const data = await AsyncStorage.getItem("@currentUser");

  if (!data) {
    return null;
  }

  return JSON.parse(data) as User;
};

const saveCurrentUser = async (user: User): Promise<void> => {
  await AsyncStorage.setItem("@currentUser", JSON.stringify(user));
};

const removeCurrentUser = async (): Promise<void> => {
  await AsyncStorage.removeItem("@currentUser");
};

export default {
  checkExists,
  getCurrentUser,
  getUserByDocument,
  removeCurrentUser,
  saveCurrentUser,
  saveUser,
};
