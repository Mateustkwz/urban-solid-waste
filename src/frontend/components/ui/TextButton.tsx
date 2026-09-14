// TextButton.tsx
import React from "react";
import {
  ActivityIndicator,
  FlexAlignType,
  TouchableOpacity,
  type TouchableOpacityProps
} from "react-native";

import { useThemeColor } from "@hooks/useThemeColor";
import type { Colors } from "@theme/index";
import { Text } from "./Text"; // seu componente Text

export type TextButtonProps = TouchableOpacityProps & {
  children: string;
  color?: keyof typeof Colors.light;
  backgroundColor?: keyof typeof Colors.light;
  fontWeight?: "400" | "700";
  alignSelf?: FlexAlignType;
  paddingHorizontal?: number;
  paddingVertical?: number;
  isLoading?: boolean;
};

export const TextButton = ({
  style,
  color = "primary",
  children,
  backgroundColor = "transparent",
  fontWeight = "400",
  isLoading = false,
  alignSelf = "flex-end",
  paddingHorizontal = 16,
  paddingVertical = 4,
  ...props
}: TextButtonProps) => {
  const textColor = useThemeColor(color);
  const bgc = useThemeColor(backgroundColor);

  return (
    <TouchableOpacity
      style={[
        style,
        {
          backgroundColor: bgc,
          alignSelf: alignSelf,
          paddingHorizontal,
          paddingVertical,
        },
      ]}
      disabled={isLoading}
      {...props}
    >
      <Text color={color} style={{ color: textColor, fontWeight }}>
        {isLoading ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : (
          children
        )}
      </Text>
    </TouchableOpacity>
  );
};
