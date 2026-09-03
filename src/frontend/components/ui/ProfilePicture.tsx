import { StyleSheet } from "react-native";

import { nameInitials } from "@frontend-utils/text.util";
import { Colors, Radius, Size, Spacing } from "@theme/index";

import { Text, View } from ".";

export const ProfilePicture = ({ name }: { name: string }) => {
  return (
    <View style={styles.picture}>
      <Text style={Size.body} variant="h1" color="background">
        {nameInitials(name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  picture: {
    backgroundColor: Colors.light.primary,
    borderRadius: Radius.round,
    height: Spacing.huge * 1.1,
    width: Spacing.huge * 1.1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
});
