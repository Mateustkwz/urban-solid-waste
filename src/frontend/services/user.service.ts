import userService from "@backend-services/user.service";

const getCurrentUser = async () => {
  return userService.getCurrentUser();
};

export { getCurrentUser };
