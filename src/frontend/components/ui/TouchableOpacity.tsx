// TouchableOpacity.tsx
import {
  ActivityIndicator,
  TouchableOpacity as RNTouchableOpacity,
  StyleSheet,
  type TouchableOpacityProps as RNTouchableOpacityProps,
} from "react-native";

import { useThemeColor } from "@hooks/useThemeColor";
import type { Colors } from "@theme/index";

export type ButtonProps = RNTouchableOpacityProps & {
  backgroundColor?: keyof typeof Colors.light;
  borderColor?: keyof typeof Colors.light;
  textColor?: keyof typeof Colors.light;
  isLoading?: boolean;
};

export const TouchableOpacity = ({
  style,
  backgroundColor = "primary",
  borderColor = "transparent",
  textColor = "surface",
  isLoading = false,
  ...props
}: ButtonProps) => {
  const bg = useThemeColor(backgroundColor);
  const bc = useThemeColor(borderColor);
  const tc = useThemeColor(textColor);

  return (
    <RNTouchableOpacity
      style={[styles.base, { backgroundColor: bg, borderColor: bc }, style]}
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
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
