import React from "react";
import { View as RNView, type ViewProps as RNViewProps } from "react-native";

import { useThemeColor } from "@hooks/useThemeColor";
import { Colors } from "@theme/index";

export type ViewProps = RNViewProps & {
  background?: keyof typeof Colors.light;
  borderColor?: keyof typeof Colors.light;
};

export const View = ({
  style,
  background = "transparent",
  borderColor = "transparent",
  ...props
}: ViewProps) => {
  const backgroundColor = useThemeColor(background);
  const bc = useThemeColor(borderColor);

  return (
    <RNView
      style={[
        {
          backgroundColor,
          borderColor: bc,
        },
        style,
      ]}
      {...props}
    />
  );
};
