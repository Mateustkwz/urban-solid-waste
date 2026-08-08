import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "@screens/shared/SplashScreen";

import { AppNavigator } from "./AppNavigator";
import { AuthNavigator } from "./AuthNavigator";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const logged = false;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />

      {!logged ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="App" component={AppNavigator} />
      )}
    </Stack.Navigator>
  );
};
