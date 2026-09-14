import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type AuthNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type AppStackParamList = {
  Main: undefined;
  NewDelivery: undefined;
};

type AppNavigationProp = NativeStackNavigationProp<AppStackParamList, "Main">;

export { AppNavigationProp, AuthNavigationProp };

