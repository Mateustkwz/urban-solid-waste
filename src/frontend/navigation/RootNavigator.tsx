import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Nunito_600SemiBold, Nunito_700Bold } from "@expo-google-fonts/nunito";
import React, { useEffect, useState } from "react";

import { useLoadData } from "@hooks/useLoadData";
import SplashScreen from "@screens/SplashScreen";
import { useUserStore } from "@store/userStore";

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
  const { loadData } = useLoadData();
  const { isAuthenticated } = useUserStore();

  const [isLoading, setIsLoading] = useState(true);

  const loadInitialData = async () => {
    await loadData();

    setIsLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  if (isLoading || (!fontsLoaded && !fontError)) {
    return <SplashScreen />;
  }

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};
