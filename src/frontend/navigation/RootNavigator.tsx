import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import SplashScreen from "@screens/SplashScreen";
import { useAuthStore } from "@store/authStore";

import { AppNavigator } from "./AppNavigator";
import { AuthNavigator } from "./AuthNavigator";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { isAuthenticated } = useAuthStore();

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showSplash ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : (
        <>
          {!isAuthenticated ? (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          ) : (
            <Stack.Screen name="App" component={AppNavigator} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};
