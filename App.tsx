import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import Toast from "react-native-toast-message";

import { RootNavigator } from "@navigation/RootNavigator";

import "./src/frontend/i18n";

enableScreens();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
}
