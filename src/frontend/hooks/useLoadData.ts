import { UserRole } from "@constants/common";
import * as authService from "@frontend-services/auth.service";
import {
  loadAssociationDeliveries,
  loadUserDeliveries,
} from "@frontend-services/delivery.service";
import { loadAssociationsAndCityHallData } from "@frontend-services/environment.service";
import { getRewards } from "@frontend-services/reward.service";
import { getAllUsers, getCurrentUser } from "@frontend-services/user.service";
import { useAssociationStore } from "@store/associationStore";
import { useCityHallStore } from "@store/cityHallStore";
import { useDeliveryStore } from "@store/deliveryStore";
import { useRewardStore } from "@store/rewardStore";
import { useUserStore } from "@store/userStore";

export const useLoadData = () => {
  const { login, logout, setCurrentRole, updateAddresses, updateRewards } =
    useUserStore();
  const { setAssociations } = useAssociationStore();
  const { setCityHall, setUserList } = useCityHallStore();
  const { setDeliveries } = useDeliveryStore();
  const { setRewards } = useRewardStore();

  const loadData = async () => {
    try {
      await authService.firstLaunch();

      const [currentUser, associationAndCityHall, rewards] = await Promise.all([
        getCurrentUser(),
        loadAssociationsAndCityHallData(),
        getRewards(),
      ]);

      if (currentUser?.role[0] === "CITY_HALL") {
        const userList = await getAllUsers();

        setUserList(
          userList.filter(
            (user) => !user.role.includes("CITY_HALL" as UserRole),
          ),
        );
      }

      if (rewards.length) {
        setRewards(rewards);
      }

      if (associationAndCityHall.associations.length) {
        setAssociations(associationAndCityHall.associations);
      }

      if (associationAndCityHall.cityHall) {
        setCityHall(associationAndCityHall.cityHall);
      }

      if (!currentUser) {
        logout();
        return;
      }

      if (currentUser.rewards) {
        updateRewards(currentUser.rewards);
      }

      if (currentUser.address) {
        updateAddresses(currentUser.address);
      }

      const [session, deliveries] = await Promise.all([
        authService.checkSessionValidity(currentUser.id),
        currentUser.role[0] === "CITIZEN"
          ? loadUserDeliveries(currentUser.id)
          : loadAssociationDeliveries(currentUser.id),
      ]);

      if (deliveries.length) {
        setDeliveries(deliveries);
      }

      if (session) {
        login(currentUser);

        setCurrentRole(
          currentUser,
          currentUser.role.length > 1 ? undefined : currentUser.role[0],
        );
      } else {
        logout();
        await authService.logout(currentUser.id);
      }
    } catch (error) {
      console.error("Initialization failed", error);
      logout();
    }
  };

  return { loadData };
};
