import userService from "@backend-services/user.service";
import { Address } from "@frontend-types/common.type";
import { User } from "@frontend-types/user.type";

const getCurrentUser = async () => {
  return userService.getCurrentUser();
};

const getAllUsers = async () => {
  return userService.getAllUsers();
};

const getUserAddresses = async (userId: string) => {
  return userService.getUserAddresses(userId);
};

const updateCurrentUser = async (user: User) => {
  return userService.saveCurrentUser(user);
};

const addNewAddress = async (address: Address, user: User) => {
  const updatedAddresses = user.address
    ? [...user.address, address]
    : [address];

  await updateCurrentUser({
    ...user,
    address: updatedAddresses,
  });

  return userService.addNewAddress(address, user.id);
};

const updateAddress = async (address: Address, user: User) => {
  const updatedAddresses =
    user.address?.filter((addr) => addr.id !== address.id) || [];

  await updateCurrentUser({
    ...user,
    address: [...updatedAddresses, address],
  });

  return userService.updateCurrentAddress(address, user.id);
};

const deleteAllAddresses = async (userId: string) => {
  return userService.deleteAddresses(userId);
};

const blockUser = async (userId: string) => {
  return userService.blockUser(userId);
};

const unblockUser = async (userId: string) => {
  return userService.unblockUser(userId);
};

export {
  addNewAddress,
  blockUser,
  deleteAllAddresses,
  getAllUsers,
  getCurrentUser,
  getUserAddresses,
  unblockUser,
  updateAddress,
  updateCurrentUser
};

