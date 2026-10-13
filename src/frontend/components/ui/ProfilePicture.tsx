import React from "react";
import { StyleSheet } from "react-native";

import { nameInitials } from "@frontend-utils/text.util";
import { Colors, Radius, Size, Spacing } from "@theme/index";

import { Text, View } from ".";

export const ProfilePicture = ({
  name,
  height = Spacing.huge * 1.1,
  width = Spacing.huge * 1.1,
  variant = "body",
  backgroundColor = "primary",
}: {
  name: string;
  height?: number;
  width?: number;
  backgroundColor?: keyof typeof Colors.light;
  variant?: keyof typeof Size;
}) => {
  return (
    <View
      style={[styles.picture, { height, width }]}
      background={backgroundColor}
    >
      <Text style={Size[variant]} variant="h1" color="surface">
        {nameInitials(name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  picture: {
    borderRadius: Radius.round,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
});
