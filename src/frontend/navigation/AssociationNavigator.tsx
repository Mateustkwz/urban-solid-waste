import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as LucideIcons from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";

import { Icon } from "@components/ui";
import { useThemeColor } from "@hooks/useThemeColor";
import AboutScreen from "@screens/AboutScreen";
import ProfileScreen from "@screens/ProfileScreen";
import { Colors } from "@theme/colors";

const Tab = createBottomTabNavigator();

export const AssociationNavigator = () => {
  const backgroundColor = useThemeColor("background");
  const borderColor = useThemeColor("border");
  const inactiveColor = useThemeColor("icon");
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case "Delivery":
              iconName = "Package";
              break;
            case "Rewards":
              iconName = "Gift";
              break;
            case "Profile":
              iconName = "User";
              break;
            case "Info":
              iconName = "Info";
              break;
            default:
              iconName = "Home";
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
      <Tab.Screen name="Info" component={AboutScreen} />
      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
