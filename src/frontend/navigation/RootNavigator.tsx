import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Nunito_600SemiBold, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useCallback, useEffect, useState } from "react";

import * as authService from "@frontend-services/auth.service";
import { getCurrentUser } from "@frontend-services/user.service";
import SplashScreen from "@screens/SplashScreen";
import { useAuthStore } from "@store/authStore";

import { AppNavigator } from "./AppNavigator";
import { AuthNavigator } from "./AuthNavigator";

export const RootNavigator = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Nunito-Bold": Nunito_700Bold,
    "Nunito-SemiBold": Nunito_600SemiBold,
    "Inter-Regular": Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
  });

  const { isAuthenticated, login, logout, setCurrentRole } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        logout();
        return;
      }

      const session = await authService.checkSessionValidity(currentUser.id);

      if (session) {
        login(currentUser);
        setCurrentRole(
          currentUser,
          currentUser.role.length > 1 ? undefined : currentUser.role[0],
        );
      } else {
        logout();
        await authService.logout(currentUser.id);
      }
    } catch (error) {
      console.error("Initialization failed", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [login, logout, setCurrentRole]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading || (!fontsLoaded && !fontError)) {
    return <SplashScreen />;
  }

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};
