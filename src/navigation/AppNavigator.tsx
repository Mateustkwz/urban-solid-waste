import { useAuthStore } from "@store/authStore";

import AssociationNavigator from "./AssociationNavigator";
import CitizenNavigator from "./CitizenNavigator";
import CityHallNavigator from "./CityHallNavigator";

export default function AppNavigator() {
  const role = useAuthStore((state) => state.role);

  switch (role) {
    case "CITIZEN":
      return <CitizenNavigator />;

    case "ASSOCIATION":
      return <AssociationNavigator />;

    case "CITY_HALL":
      return <CityHallNavigator />;

    default:
      return null;
  }
}
