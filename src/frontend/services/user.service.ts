import userService from "@backend-services/user.service";
import { Address } from "@frontend-types/common.type";
import { User } from "@frontend-types/user.type";

const getCurrentUser = async () => {
  return userService.getCurrentUser();
};

const getUserAddresses = async (userId: string) => {
  return userService.getUserAddresses(userId);
};

const updateCurrentUser = async (user: User) => {
  return userService.saveCurrentUser(user);
};

const addNewAddress = async (address: Address, user: User) => {
  await updateCurrentUser({
    ...user,
    address: [...(user.address as Address[]), address],
  });

  return userService.addNewAddress(address, user.id);
};

const updateAddress = async (address: Address, user: User) => {
  await updateCurrentUser({
    ...user,
    address: [...(user.address as Address[]), address],
  });

  return userService.updateCurrentAddress(address, user.id);
};

const deleteAllAddresses = async (userId: string) => {
  return userService.deleteAddresses(userId);
};

export {
  addNewAddress,
  deleteAllAddresses,
  getCurrentUser,
  getUserAddresses,
  updateAddress,
  updateCurrentUser
};

