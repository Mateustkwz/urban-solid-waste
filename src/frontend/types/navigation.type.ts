import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export { NavigationProp };
