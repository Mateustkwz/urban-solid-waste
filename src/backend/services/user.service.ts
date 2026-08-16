import { User } from "@backend-types/user.type";
import { UserRole, textRoles } from "@constants/common";
import { createNotFoundError, errorMessages } from "@constants/errors";
import userRepository from "@repositories/user.repository";

const getUserByDocument = async (
  cpfOrCnpj: string,
  role: UserRole,
): Promise<User> => {
  const user = await userRepository.getUserByDocument(cpfOrCnpj, role);

  if (!user) {
    throw new Error(
      createNotFoundError(errorMessages.getDataError + textRoles[role]),
    );
  }

  return {
    id: user.id,
    address: user.address,
    email: user.email,
    name: user.name,
    password: user.password,
    role,
    cpfOrCnpj: user.cpf_or_cnpj,
    points: user.points,
  };
};

const checkExists = async (
  cpfOrCnpj: string,
  role: UserRole,
): Promise<boolean> => {
  return userRepository.checkExists(cpfOrCnpj, role);
};

const getCurrentUser = async (): Promise<User | null> => {
  return userRepository.getCurrentUser();
};

const saveCurrentUser = async (user: User): Promise<void> => {
  return userRepository.saveCurrentUser(user);
};

const saveUser = async (user: User): Promise<void> => {
  await userRepository.saveUser(user);
};

const removeCurrentUser = async (): Promise<void> => {
  await userRepository.removeCurrentUser();
};

export default {
  checkExists,
  getCurrentUser,
  getUserByDocument,
  removeCurrentUser,
  saveCurrentUser,
  saveUser,
};
