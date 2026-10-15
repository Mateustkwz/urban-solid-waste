import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import * as LucideIcons from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";

import ManageAssociationsScreen from "@screens/ManageAssociationsScreen";
import ManageUsersScreen from "@screens/ManageUsersScreen";
import ProfileScreen from "@screens/ProfileScreen";

import { Icon } from "@components/ui";
import { useThemeColor } from "@hooks/useThemeColor";
import ManageRewardsScreen from "@screens/ManageRewardsScreen";
import { Colors } from "@theme/colors";

type TabParamList = {
  Associations: undefined;
  CityHall: undefined;
  Profile: undefined;
  Users: undefined;
};

export type CityHallNavProp = BottomTabNavigationProp<TabParamList>;

const Tab = createBottomTabNavigator();

export const CityHallNavigator = () => {
  const { t } = useTranslation();

  const backgroundColor = useThemeColor("background");
  const borderColor = useThemeColor("border");
  const inactiveColor = useThemeColor("icon");

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case "Associations":
              iconName = "Package";
              break;
            case "Profile":
              iconName = "User";
              break;
            case "Users":
              iconName = "UserGroup";
              break;
            default:
              iconName = "Trophy";
              break;
          }

          return (
            <Icon
              color={focused ? "primary" : "textSecondary"}
              name={iconName as keyof typeof LucideIcons}
            />
          );
        },
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: backgroundColor,
          borderTopColor: borderColor,
          height: 72,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
        tabBarLabel: t(`common.bottomTab.${route.name}`),
        headerTitle: t(`common.headerTab.${route.name}`),
      })}
    >
      <Tab.Screen name="CityHall" component={ManageRewardsScreen} />
      <Tab.Screen name="Associations" component={ManageAssociationsScreen} />
      <Tab.Screen name="Users" component={ManageUsersScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
