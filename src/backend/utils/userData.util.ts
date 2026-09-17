import { Address } from "@backend-types/common.type";
import { User } from "@backend-types/user.type";
import { AddressModel } from "@models/common.model";
import { UserModel } from "@models/user.model";
import { UserSchema } from "@storage/user.storage";
import { toRewardData, toRewardModel } from "./rewardData.util";

export const searchUserById = (userData: string, userId: string) => {
  const users = JSON.parse(userData) as UserSchema;

  const user = Object.entries(users["@user"]).find(
    (item) => item[1].id === userId,
  );

  return user ? { ...user[1] } : null;
};

export const convertUserDataToModel = (user: User): UserModel => {
  return {
    id: user.id,
    address: user.address ? convertAddressDataToModel(user.address) : [],
    rewards: user.rewards
      ? user.rewards.map((item) => toRewardModel(item))
      : [],
    email: user.email,
    name: user.name,
    password: user.password,
    role: user.role,
    cpf_or_cnpj: user.cpfOrCnpj,
    points: user.points || 0,
  };
};

export const convertUserModelToData = (user: UserModel): User => {
  return {
    id: user.id,
    address: user.address ? convertAddressModelToData(user.address) : [],
    rewards: user.rewards ? user.rewards.map((item) => toRewardData(item)) : [],
    email: user.email,
    name: user.name,
    password: user.password,
    role: user.role,
    cpfOrCnpj: user.cpf_or_cnpj,
    points: user.points || 0,
  };
};

export const convertAddressDataToModel = (
  address: Address[],
): AddressModel[] => {
  return address.map((item) => ({
    city: item.city,
    name: item.name,
    state: item.state,
    zip_code: item.zipCode,
    id: item.id,
    complement: item.complement || "",
    type: item.type,
    number: item.number,
    street: item.street,
  }));
};

export const convertAddressModelToData = (
  address: AddressModel[],
): Address[] => {
  return address.map((item) => ({
    city: item.city,
    state: item.state,
    name: item.name,
    zipCode: item.zip_code,
    id: item.id,
    complement: item.complement,
    type: item.type,
    number: item.number,
    street: item.street,
  }));
};
