import userService from "@backend-services/user.service";
import { Address } from "@frontend-types/common.type";

const getCurrentUser = async () => {
  return userService.getCurrentUser();
};

const getUserAddresses = async (userId: string) => {
  return userService.getUserAddresses(userId);
};

const addNewAddress = async (address: Address, userId: string) => {
  return userService.addNewAddress(address, userId);
};

const updateAddress = async (address: Address, userId: string) => {
  return userService.updateCurrentAddress(address, userId);
};

const deleteAllAddresses = async (userId: string) => {
  return userService.deleteAddresses(userId);
};

export {
  addNewAddress,
  deleteAllAddresses,
  getCurrentUser,
  getUserAddresses,
  updateAddress
};

