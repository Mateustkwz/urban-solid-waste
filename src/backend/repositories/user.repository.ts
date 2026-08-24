import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "@backend-types/user.type";
import { delay } from "@backend-utils/common.util";
import { UserModel } from "@models/user.model";
import { UserSchema } from "@storage/user.storage";

const getUserByDocument = async (
  cpfOrCnpj: string,
): Promise<UserModel | null> => {
  const data = await AsyncStorage.getItem("@user");

  await delay();

  if (!data) {
    return null;
  }

  const users = JSON.parse(data) as UserSchema;

  const user = users["@user"][cpfOrCnpj];

  return user ?? null;
};

const checkExists = async (cpfOrCnpj: string): Promise<boolean> => {
  const user = await getUserByDocument(cpfOrCnpj);

  await delay();

  return user !== null;
};

const saveUser = async (user: User) => {
  const data = await AsyncStorage.getItem("@user");

  const users: UserSchema = data ? JSON.parse(data) : { "@user": {} };

  users["@user"][user.cpfOrCnpj] = {
    ...user,
    cpf_or_cnpj: user.cpfOrCnpj,
    points: user.points ?? 0,
  };

  await AsyncStorage.setItem("@user", JSON.stringify(users));

  await delay();
};

const getCurrentUser = async (): Promise<User | null> => {
  const data = await AsyncStorage.getItem("@currentUser");

  await delay();

  if (!data) {
    return null;
  }

  return JSON.parse(data) as User;
};

const saveCurrentUser = async (user: User): Promise<void> => {
  await AsyncStorage.setItem("@currentUser", JSON.stringify(user));

  await delay();
};

const removeCurrentUser = async (): Promise<void> => {
  await AsyncStorage.removeItem("@currentUser");

  await delay();
};

export default {
  checkExists,
  getCurrentUser,
  getUserByDocument,
  removeCurrentUser,
  saveCurrentUser,
  saveUser,
};
