import AsyncStorage from "@react-native-async-storage/async-storage";

import { User, UserRole } from "@app-types/user.type";
import { textRoles } from "@constants/common";
import {
  createConflictError,
  createNotFoundError,
  errorMessages,
} from "@constants/errors";
import { UserSchema } from "@models/user.model";

const getUserByDocument = async (
  cpfOrCnpj: string,
  role: UserRole,
): Promise<User> => {
  const data = await AsyncStorage.getItem(`@${role}`);

  if (!data) {
    throw new Error(
      createNotFoundError(errorMessages.getDataError + textRoles[role]),
    );
  }

  const formatedData = JSON.parse(data) as UserSchema;

  if (!formatedData[cpfOrCnpj]) {
    throw new Error(createConflictError(errorMessages.userAlreadyExists));
  }

  const { id, address, email, name, password, cpf_or_cnpj, points } =
    formatedData[cpfOrCnpj];

  return {
    id,
    address,
    email,
    name,
    password,
    role,
    cpfOrCnpj: cpf_or_cnpj,
    points,
  };
};

const checkExists = async (
  cpfOrCnpj: string,
  role: UserRole,
): Promise<boolean> => {
  const data = await AsyncStorage.getItem(`@${role}`);

  if (!data) {
    return false;
  }

  const parsedData = JSON.parse(data) as UserSchema;

  return parsedData[cpfOrCnpj] !== undefined;
};

export { checkExists, getUserByDocument };

