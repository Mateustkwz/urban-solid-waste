import * as Crypto from "expo-crypto";

import { User } from "@backend-types/user.type";
import { isValidCNPJ, isValidCPF } from "@backend-utils/userValidation.util";
import { UserRole } from "@constants/common";
import {
  createBadRequestError,
  createConflictError,
  createNotFoundError,
  errorMessages,
} from "@constants/errors";
import { RegisterSchema } from "@models/schemas/auth.schema";
import authRepository from "@repositories/auth.repository";
import userRepository from "@repositories/user.repository";
import { associationMock } from "@storage/mock/associations.mock";
import rewardService from "./reward.service";

import userService from "./user.service";

const encryptPassword = async (password: string): Promise<string> => {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password,
  );
};

const createAccount = async (user: User): Promise<void> => {
  const schemaValidationResult = RegisterSchema(
    user.role[0] === UserRole.CITIZEN,
  ).safeParse(user);

  if (!schemaValidationResult.success) {
    throw new Error(
      createBadRequestError(schemaValidationResult.error.issues[0].message),
    );
  }

  const exists = await userService.checkExists(user.cpfOrCnpj);

  if (exists) {
    throw new Error(createConflictError(errorMessages.userAlreadyExists));
  }

  const newUser: User = {
    ...user,
    id: Crypto.randomUUID(),
    password: await encryptPassword(user.password),
  };

  await userService.createUser(newUser);
};

const userAuthentication = async (
  cpfOrCnpj: string,
  password: string,
): Promise<{ user: User; token: string }> => {
  const isValidDocument = isValidCPF(cpfOrCnpj) || isValidCNPJ(cpfOrCnpj);
  if (!isValidDocument) {
    throw new Error(createConflictError(errorMessages.invalidDocument));
  }

  let user: User | null = null;

  try {
    user = await userService.getUserByDocument(cpfOrCnpj);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    if (!user) {
      throw new Error(createNotFoundError(errorMessages.userNotRegistered));
    }
  }

  if (user?.password !== (await encryptPassword(password))) {
    throw new Error(createConflictError(errorMessages.userOrPasswordInvalid));
  }

  const currentUser: User = {
    ...user,
    password: "",
  };

  const session = await authRepository.createSession(currentUser.id);
  await userService.saveCurrentUser(currentUser);

  return { user: currentUser, token: session.token };
};

const userSelectRole = async (role: UserRole) => {
  const user = await userService.getCurrentUser();

  if (!user) {
    throw new Error(createNotFoundError(errorMessages.userNotFound));
  }

  await userService.saveCurrentUser({ ...user, currentRole: role });
};

const checkTokenValidity = async (userId: string): Promise<boolean> => {
  const session = await authRepository.getSessionByUserId(userId);

  if (!session) {
    return false;
  }

  return Date.now() < session.expiration;
};

const logout = async (userId: string): Promise<void> => {
  await authRepository.deleteSession(userId);
  await userService.removeCurrentUser();
};

const mockFirstLogin = async () => {
  const isFirstLogin = await authRepository.isFirstLaunch();
  const associations = [];

  for (const association of associationMock) {
    const associationPasswordEncrypted = {
      ...association,
      password: await encryptPassword(association.password),
    };

    associations.push(associationPasswordEncrypted);
  }

  if (isFirstLogin) {
    await userRepository.createMockUsers(associations as User[]);
    await rewardService.loadMockRewards();
  }
};

export default {
  checkTokenValidity,
  createAccount,
  logout,
  userAuthentication,
  userSelectRole,
  mockFirstLogin,
};
