import * as Crypto from "expo-crypto";

import { Address } from "@backend-types/common.type";
import { User } from "@backend-types/user.type";
import {
  convertAddressDataToModel,
  convertAddressModelToData,
  convertUserModelToData,
} from "@backend-utils/userData.util";
import {
  createConflictError,
  createNotFoundError,
  errorMessages,
} from "@constants/errors";
import { AddressModel } from "@models/common.model";
import userRepository from "@repositories/user.repository";

const getUserByDocument = async (cpfOrCnpj: string): Promise<User> => {
  const user = await userRepository.getUserByDocument(cpfOrCnpj);

  if (!user) {
    throw new Error(createNotFoundError(errorMessages.userNotFound));
  }

  return {
    id: user.id,
    address: user.address ? convertAddressModelToData(user.address) : undefined,
    email: user.email,
    name: user.name,
    password: user.password,
    role: user.role,
    cpfOrCnpj: user.cpf_or_cnpj,
    points: user.points,
  };
};

const loadAssociationsAndCityHall = async () => {
  const [associations, cityHall] = await Promise.all([
    userRepository.getAssociations(),
    userRepository.getCityHall(),
  ]);

  return {
    associations: associations.length
      ? associations.map((item) => convertUserModelToData(item))
      : [],
    cityHall: cityHall && convertUserModelToData(cityHall),
  };
};

const checkExists = async (cpfOrCnpj: string): Promise<boolean> => {
  return userRepository.checkExists(cpfOrCnpj);
};

const getCurrentUser = async (): Promise<User | null> => {
  return userRepository.getCurrentUser();
};

const saveCurrentUser = async (user: User): Promise<void> => {
  return userRepository.saveCurrentUser(user);
};

const createUser = async (user: User): Promise<void> => {
  await userRepository.createUser(user);
};

const removeCurrentUser = async (): Promise<void> => {
  await userRepository.removeCurrentUser();
};

const getUserAddresses = async (userId: string) => {
  const userData = await userRepository.getUserById(userId);

  if (!userData) {
    throw new Error(createNotFoundError(errorMessages.userNotFound));
  }

  if (userData.address) {
    return convertAddressModelToData(userData.address);
  }

  return [];
};

const addNewAddress = async (address: Address, userId: string) => {
  const userData = await userRepository.getUserById(userId);

  if (!userData) {
    throw new Error(createNotFoundError(errorMessages.userNotFound));
  }

  if (
    userData.address &&
    userData.address.find((item) => item.name === address.name)
  ) {
    throw new Error(createConflictError(errorMessages.duplicateAddressName));
  }

  if (
    userData.address &&
    userData.address.find((item) => item.id === address.id)
  ) {
    throw new Error(createConflictError(errorMessages.addressAlreadyExists));
  }

  let addresses: AddressModel[] = [];
  const newAddress = { ...address, id: Crypto.randomUUID() };

  if (userData.address?.length) {
    addresses = [
      ...userData.address,
      convertAddressDataToModel([newAddress])[0],
    ];
  } else {
    addresses = convertAddressDataToModel([newAddress]);
  }

  await userRepository.updateAddress(userData, addresses);

  return convertAddressModelToData(addresses);
};

const updateCurrentAddress = async (address: Address, userId: string) => {
  const userData = await userRepository.getUserById(userId);

  if (!userData) {
    throw new Error(createNotFoundError(errorMessages.userNotFound));
  }

  const currentAddress = userData?.address?.find(
    (item) => item.id === address.id,
  );

  if (!currentAddress || !userData.address) {
    throw new Error(createNotFoundError(errorMessages.addressNotFound));
  }

  const addresses = userData.address.map((item) => {
    if (item.id === address.id) {
      return convertAddressDataToModel([address])[0];
    }

    return item;
  });

  await userRepository.updateAddress(userData, addresses);

  return convertAddressModelToData(addresses);
};

const deleteAddresses = async (userId: string) => {
  const userData = await userRepository.getUserById(userId);

  if (!userData) {
    throw new Error(createNotFoundError(errorMessages.userNotFound));
  }

  await userRepository.deleteAddresses(userData);
};

export default {
  addNewAddress,
  checkExists,
  getCurrentUser,
  getUserByDocument,
  removeCurrentUser,
  saveCurrentUser,
  createUser,
  loadAssociationsAndCityHall,
  getUserAddresses,
  deleteAddresses,
  updateCurrentAddress,
};
