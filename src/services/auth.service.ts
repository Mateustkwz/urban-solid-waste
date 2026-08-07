import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

import { User, UserRole } from "@app-types/user.type";
import {
  createBadRequestError,
  createConflictError,
  errorMessages,
} from "@constants/errors";
import { RegisterSchema } from "@models/schemas/auth.schema";
import { UserSchema } from "@models/user.model";
import { isValidCNPJ, isValidCPF } from "@utils/userValidation";

import { checkExists, getUserByDocument } from "./user.service";

const encryptPassword = async (password: string): Promise<string> => {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password,
  );
};

const createAccount = async (user: User) => {
  const schemaValidationResult = RegisterSchema(
    user.role === "CITIZEN",
  ).safeParse(user);

  if (!schemaValidationResult.success) {
    throw new Error(
      createBadRequestError(schemaValidationResult.error.issues[0].message),
    );
  }

  const exists = await checkExists(user.cpfOrCnpj, user.role);

  if (exists) {
    throw new Error(createConflictError(errorMessages.userAlreadyExists));
  }

  await AsyncStorage.setItem(
    `@${user.role}`,
    JSON.stringify({
      [user.cpfOrCnpj]: {
        ...user,
        id: Crypto.randomUUID(),
        password: await encryptPassword(user.password),
        cpf_or_cnpj: user.cpfOrCnpj,
        role: user.role,
      },
    } as UserSchema),
  );
};

const userAuthentication = async (
  cpfOrCnpj: string,
  password: string,
  role: UserRole,
) => {
  if (isValidCPF(cpfOrCnpj) && isValidCNPJ(cpfOrCnpj)) {
    const user = await getUserByDocument(cpfOrCnpj, role);

    if (!user) {
      throw new Error(createConflictError(errorMessages.userNotFound));
    }

    if (user.password !== (await encryptPassword(password))) {
      throw new Error(createConflictError(errorMessages.userOrPasswordInvalid));
    }

    return {
      ...user,
      password: undefined,
    };
  }
};

export { createAccount, userAuthentication };
