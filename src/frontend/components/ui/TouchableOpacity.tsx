// TouchableOpacity.tsx
import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity as RNTouchableOpacity,
  StyleSheet,
  type TouchableOpacityProps as RNTouchableOpacityProps,
} from "react-native";

import { useThemeColor } from "@hooks/useThemeColor";
import type { Colors } from "@theme/index";

export type ButtonProps = RNTouchableOpacityProps & {
  borderRadius?: number;
  padding?: number;
  justifyContent?: string;
  backgroundColor?: keyof typeof Colors.light;
  borderColor?: keyof typeof Colors.light;
  textColor?: keyof typeof Colors.light;
  isLoading?: boolean;
};

export const TouchableOpacity = ({
  style,
  backgroundColor = "primary",
  borderColor = "transparent",
  borderRadius = 8,
  textColor = "surface",
  justifyContent = "center",
  isLoading = false,
  padding = 24,
  ...props
}: ButtonProps) => {
  const bg = useThemeColor(backgroundColor);
  const bc = useThemeColor(borderColor);
  const tc = useThemeColor(textColor);

  return (
    <RNTouchableOpacity
      style={[
        styles.base,
        {
          backgroundColor: bg,
          borderColor: bc,
          borderRadius: borderRadius,
          padding,
          justifyContent: justifyContent as
            | "center"
            | "flex-start"
            | "flex-end"
            | "space-between"
            | "space-around"
            | "space-evenly"
            | undefined,
        },
        style,
      ]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={tc} size="small" />
      ) : (
        props.children
      )}
    </RNTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
  },
});
