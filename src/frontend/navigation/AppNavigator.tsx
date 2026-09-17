import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";

import { Address } from "@frontend-types/common.type";
import AboutScreen from "@screens/AboutScreen";
import AddressFormScreen from "@screens/AddressFormScreen";
import DeliveryFormScreen from "@screens/DeliveryFormScreen";
import MyAddresses from "@screens/MyAddressesScreen";
import SelectRole from "@screens/SelectRole";

import { useUserStore } from "../store/userStore";

import { DeliveryType } from "@frontend-types/delivery.type";
import { AssociationNavigator } from "./AssociationNavigator";
import { CitizenNavigator } from "./CitizenNavigator";
import { CityHallNavigator } from "./CityHallNavigator";

export type AppNavigationList = {
  Main: undefined;
  About: undefined;
  DeliveryForm: { delivery?: DeliveryType };
  AddressForm: { address?: Address };
  MyAddresses: undefined;
};

export type AppNavProp = NativeStackNavigationProp<AppNavigationList>;

const RootStack = createNativeStackNavigator<AppNavigationList>();

export const AppNavigator = () => {
  const { user, logout } = useUserStore();

  if (!user) {
    logout();
  }

  const getRoleNavigator = () => {
    switch (user?.currentRole) {
      case "CITIZEN":
        return CitizenNavigator;
      case "ASSOCIATION":
        return AssociationNavigator;
      case "CITY_HALL":
        return CityHallNavigator;
      default:
        return SelectRole;
    }
  };

  return (
    <RootStack.Navigator>
      {/* Role-based navigator */}
      <RootStack.Screen
        name="Main"
        component={getRoleNavigator()}
        options={{ headerShown: false }}
      />

      {/* About screen */}
      <RootStack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: "Sobre" }}
      />

      {/* New Delivery screen */}
      <RootStack.Screen
        name="DeliveryForm"
        component={DeliveryFormScreen}
        options={({ route }) => ({
          presentation: "modal",
          title: route.params.delivery ? "Editar Entrega" : "Nova Entrega",
        })}
      />

      {/* Address Form screen */}
      <RootStack.Screen
        name="AddressForm"
        component={AddressFormScreen}
        options={({ route }) => ({
          presentation: "modal",
          title: route.params.address
            ? "Editar Endereço"
            : "Cadastrar Endereço",
        })}
      />

      {/* My Addresses screen */}
      <RootStack.Screen
        name="MyAddresses"
        component={MyAddresses}
        options={{ title: "Meus Endereços" }}
      />
    </RootStack.Navigator>
  );
};
