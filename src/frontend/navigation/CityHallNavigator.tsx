import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export const CityHallNavigator = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Deliveries" component={DeliveryScreen} />
      <Tab.Screen name="Rewards" component={RewardScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      <Tab.Screen name="Test" component={() => <></>} />
    </Tab.Navigator>
  );
};
