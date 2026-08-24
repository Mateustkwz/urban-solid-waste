import * as LucideIcons from "lucide-react-native";
import React from "react";
import { type StyleProp, type TextStyle } from "react-native";

import { useThemeColor } from "@hooks/useThemeColor";
import { Colors } from "@theme/index";

type IconSymbolName = keyof typeof LucideIcons;

export const Icon = ({
  name,
  size = 24,
  color = "surface",
  style,
  ...props
}: {
  name: IconSymbolName;
  size?: number;
  color?: keyof typeof Colors.light;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}) => {
  const themeColor = useThemeColor(color);

  const raw = (LucideIcons as Record<string, unknown>)[name];
  const IconComponent = raw as React.ComponentType<any> | undefined;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react-native`);

    return null;
  }

  return IconComponent ? (
    <IconComponent size={size} color={themeColor} style={style} {...props} />
  ) : null;
};
