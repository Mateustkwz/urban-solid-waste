import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";

import { Address } from "@frontend-types/common.type";
import { DeliveryType } from "@frontend-types/delivery.type";
import AboutScreen from "@screens/AboutScreen";
import AddressFormScreen from "@screens/AddressFormScreen";
import DeliveryDetailsScreen from "@screens/DeliveryDetailsScreen";
import DeliveryFormScreen from "@screens/DeliveryFormScreen";
import MyAddresses from "@screens/MyAddressesScreen";
import RegisteredAssociationsScreen from "@screens/RegisteredAssociationsScreen";
import SelectRole from "@screens/SelectRole";
import { useUserStore } from "@store/userStore";

import { AssociationNavigator } from "./AssociationNavigator";
import { CitizenNavigator } from "./CitizenNavigator";
import { CityHallNavigator } from "./CityHallNavigator";

export type AppNavigationList = {
  Main: undefined;
  About: undefined;
  DeliveryForm: { delivery?: DeliveryType };
  DeliveryDetails: { delivery?: DeliveryType };
  AddressForm: { address?: Address };
  MyAddresses: undefined;
  RegisteredAssociations: undefined;
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

      {/* Delivery Details screen */}
      <RootStack.Screen
        name="DeliveryDetails"
        component={DeliveryDetailsScreen}
        options={() => ({
          presentation: "modal",
          title: "Detalhes da Entrega",
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

      {/* Registered Associations screen */}
      <RootStack.Screen
        name="RegisteredAssociations"
        component={RegisteredAssociationsScreen}
        options={{ title: "Associações Cadastradas" }}
      />
    </RootStack.Navigator>
  );
};
