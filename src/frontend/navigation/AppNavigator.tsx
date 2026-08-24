import SelectRole from "@screens/SelectRole";

import { useAuthStore } from "../store/authStore";

import { AssociationNavigator } from "./AssociationNavigator";
import { CitizenNavigator } from "./CitizenNavigator";
import { CityHallNavigator } from "./CityHallNavigator";

export const AppNavigator = () => {
  const { user, logout } = useAuthStore();

  if (!user) {
    logout();
  }

  switch (user?.currentRole) {
    case "CITIZEN":
      return <CitizenNavigator />;

    case "ASSOCIATION":
      return <AssociationNavigator />;

    case "CITY_HALL":
      return <CityHallNavigator />;

    default:
      return <SelectRole />;
  }
};
