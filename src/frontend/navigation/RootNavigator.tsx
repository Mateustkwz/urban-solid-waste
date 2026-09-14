import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Nunito_600SemiBold, Nunito_700Bold } from "@expo-google-fonts/nunito";
import React, { useCallback, useEffect, useState } from "react";

import * as authService from "@frontend-services/auth.service";
import { loadUserDeliveries } from "@frontend-services/delivery.service";
import { loadAssociationsAndCityHallData } from "@frontend-services/environment.service";
import { getCurrentUser } from "@frontend-services/user.service";
import SplashScreen from "@screens/SplashScreen";
import { useAssociationStore } from "@store/associationStore";
import { useAuthStore } from "@store/authStore";
import { useCityHallStore } from "@store/cityHallStore";
import { useDeliveryStore } from "@store/deliveryStore";

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
  const { setAssociations } = useAssociationStore();
  const { setCityHall } = useCityHallStore();
  const { setDeliveries } = useDeliveryStore();
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [currentUser, associationAndCityHall] = await Promise.all([
        getCurrentUser(),
        loadAssociationsAndCityHallData(),
      ]);

      if (!currentUser) {
        logout();
        return;
      }

      if (associationAndCityHall.associations.length) {
        setAssociations(associationAndCityHall.associations);
      }

      if (associationAndCityHall.cityHall) {
        setCityHall(associationAndCityHall.cityHall);
      }

      const [session, deliveries] = await Promise.all([
        authService.checkSessionValidity(currentUser.id),
        loadUserDeliveries(currentUser.id),
      ]);

      if (deliveries.length) {
        setDeliveries(deliveries);
      }

      if (session) {
        console.log(currentUser);
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
  }, [
    login,
    logout,
    setAssociations,
    setCityHall,
    setCurrentRole,
    setDeliveries,
  ]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading || (!fontsLoaded && !fontError)) {
    return <SplashScreen />;
  }

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};
