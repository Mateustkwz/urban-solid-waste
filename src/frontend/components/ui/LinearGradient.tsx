// LinearGradient.tsx
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { StyleSheet, type ViewProps } from "react-native";

import { useThemeColors } from "@hooks/useThemeColors";
import type { Colors } from "@theme/index";

export type LinearGradientProps = ViewProps & {
  colors?: (keyof typeof Colors.light)[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
};

export const LinearGradient = ({
  style,
  colors = ["primary", "accent"], // default gradiente
  start,
  end,
  ...props
}: LinearGradientProps) => {
  const resolvedColors = useThemeColors(colors);

  return (
    <ExpoLinearGradient
      colors={resolvedColors as [string, string, ...string[]]}
      start={start}
      end={end}
      style={[styles.base, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    height: "auto",
  },
});
