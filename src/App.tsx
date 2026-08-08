import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";

import "./i18n";

import { RootNavigator } from "@navigation/RootNavigator";

enableScreens();

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
