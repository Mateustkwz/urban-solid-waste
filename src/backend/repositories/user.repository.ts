import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "@backend-types/user.type";
import { delay } from "@backend-utils/common.util";
import { searchUserById } from "@backend-utils/userData.util";
import { UserRole } from "@constants/common";
import { AddressModel } from "@models/common.model";
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

const getUserById = async (userId: string): Promise<UserModel | null> => {
  const data = await AsyncStorage.getItem("@user");

  await delay();

  if (!data) {
    return null;
  }

  return searchUserById(data, userId);
};

const checkExists = async (cpfOrCnpj: string): Promise<boolean> => {
  const user = await getUserByDocument(cpfOrCnpj);

  await delay();

  return user !== null;
};

const createUser = async (user: User, points = 0) => {
  const data = await AsyncStorage.getItem("@user");

  const users: UserSchema = data ? JSON.parse(data) : { "@user": {} };

  users["@user"][user.cpfOrCnpj] = {
    ...user,
    cpf_or_cnpj: user.cpfOrCnpj,
    points: points,
    rewards: [],
    address: [],
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

const getUserPoints = async (userId: string) => {
  const data = await AsyncStorage.getItem("@user");

  await delay();

  if (!data) {
    return null;
  }

  const user = searchUserById(data, userId);

  return user && user.points ? user.points : 0;
};

const updateUserPoints = async (
  userId: string,
  pointsToSet: number,
): Promise<boolean> => {
  const data = await AsyncStorage.getItem("@user");

  if (!data) {
    return false;
  }

  const users: UserSchema = JSON.parse(data);
  const user = searchUserById(data, userId);

  if (!user) {
    return false;
  }

  const newPoints = user.points + pointsToSet;

  if (newPoints < 0) {
    return false;
  }

  users["@user"][user.cpf_or_cnpj] = {
    ...user,
    points: newPoints,
  };

  return true;
};

const getAssociations = async () => {
  const data = await AsyncStorage.getItem("@user");

  await delay();

  if (!data) {
    return [];
  }

  const users: UserSchema = JSON.parse(data);

  const associations = Object.values(users["@user"]).filter((user) =>
    user.role.includes("ASSOCIATION" as UserRole),
  );

  return associations;
};

const getCityHall = async () => {
  const data = await AsyncStorage.getItem("@user");

  await delay();

  if (!data) {
    return null;
  }

  const users: UserSchema = JSON.parse(data);

  const cityHall = Object.values(users["@user"]).find((user) =>
    user.role.includes("CITY_HALL" as UserRole),
  );

  return cityHall ?? null;
};

const updateAddress = async (user: UserModel, address: AddressModel[]) => {
  const data = await AsyncStorage.getItem("@user");

  const users: UserSchema = JSON.parse(data as string);

  users["@user"][user.cpf_or_cnpj].address = address;

  await AsyncStorage.setItem("@user", JSON.stringify(users));

  await delay();
};

const updateRewards = async (user: UserModel) => {
  const data = await AsyncStorage.getItem("@user");

  const users: UserSchema = JSON.parse(data as string);

  users["@user"][user.cpf_or_cnpj] = user;

  await AsyncStorage.setItem("@user", JSON.stringify(users));

  await delay();

  return users;
};

const deleteAddresses = async (user: UserModel) => {
  const data = await AsyncStorage.getItem("@user");

  const users: UserSchema = JSON.parse(data as string);

  users["@user"][user.cpf_or_cnpj].address = [];

  await AsyncStorage.setItem("@user", JSON.stringify(users));

  await delay();
};

export default {
  checkExists,
  getCurrentUser,
  getAssociations,
  getCityHall,
  getUserById,
  getUserPoints,
  getUserByDocument,
  updateUserPoints,
  removeCurrentUser,
  saveCurrentUser,
  createUser,
  updateAddress,
  deleteAddresses,
  updateRewards,
};
