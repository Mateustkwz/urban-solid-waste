// Button.tsx
import {
	StyleSheet,
	TouchableOpacity,
	type TouchableOpacityProps,
} from "react-native";

import { useThemeColor } from "@hooks/useThemeColor";
import { Colors, Radius, Spacing } from "@theme/index";

import { Text } from "./";

export type ButtonProps = TouchableOpacityProps & {
  text: string;
  variant?: "primary" | "secondary" | "outline";
};

export const Button = ({
  text,
  variant = "primary",
  style,
  ...props
}: ButtonProps) => {
  const primary = useThemeColor("primary");
  const secondary = useThemeColor("secondary");
  const background = useThemeColor("background");

  const backgroundColor =
    variant === "primary"
      ? primary
      : variant === "secondary"
        ? secondary
        : "transparent";

  const textColor = (
    variant === "outline" ? primary : background
  ) as keyof typeof Colors.light;
  const borderColor = variant === "outline" ? primary : "transparent";

  return (
    <TouchableOpacity
      style={[styles.base, { backgroundColor, borderColor }, style]}
      {...props}
    >
      <Text variant="subtitle" color={textColor}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
