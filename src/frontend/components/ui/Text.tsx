import {
  Text as RNText,
  StyleSheet,
  type TextProps as RNTextProps,
} from "react-native";

import { useThemeColor } from "@hooks/useThemeColor";
import type { Colors, TypographyVariant } from "@theme/index";
import { Typography } from "@theme/index";

export type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  color?: keyof typeof Colors.light;
};

export const Text = ({
  style,
  variant = "body",
  color = "text",
  ...props
}: TextProps) => {
  const textColor = useThemeColor(color);

  return (
    <RNText
      style={[styles.base, Typography[variant], { color: textColor }, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
