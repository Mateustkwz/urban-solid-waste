import userService from "@backend-services/user.service";

const loadAssociationsAndCityHallData = async () => {
  return userService.loadAssociationsAndCityHall();
};

export { loadAssociationsAndCityHallData };
