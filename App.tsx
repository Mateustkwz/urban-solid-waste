import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Nunito_600SemiBold, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import Toast from "react-native-toast-message";

import { RootNavigator } from "@navigation/RootNavigator";
import SplashScreen from "@screens/SplashScreen";

import "./src/frontend/i18n";

enableScreens();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Nunito-Bold": Nunito_700Bold,
    "Nunito-SemiBold": Nunito_600SemiBold,
    "Inter-Regular": Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return <SplashScreen />;
  }

  return (
    <>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
}
