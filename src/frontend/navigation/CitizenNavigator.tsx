import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as LucideIcons from "lucide-react-native";

import { Icon } from "@components/ui";
import { useThemeColor } from "@hooks/useThemeColor";
import CitizenScreen from "@screens/CitizenScreen";
import DeliveryScreen from "@screens/DeliveryScreen";
import InfoScreen from "@screens/InfoScreen";
import RewardScreen from "@screens/RewardScreen";
import { Colors } from "@theme/colors";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

export const CitizenNavigator = () => {
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
        tabBarLabel: t(`common.headerTab.${route.name}`),
        headerTitle: t(`common.headerTab.${route.name}`),
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={CitizenScreen}
      />
      <Tab.Screen name="Delivery" component={DeliveryScreen} />
      <Tab.Screen name="Rewards" component={RewardScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />
    </Tab.Navigator>
  );
};
