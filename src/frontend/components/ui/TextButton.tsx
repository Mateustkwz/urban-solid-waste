// TextButton.tsx
import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

import { useThemeColor } from "@hooks/useThemeColor";
import type { Colors } from "@theme/index";
import { Text } from "./Text"; // seu componente Text

export type TextButtonProps = TouchableOpacityProps & {
  color?: keyof typeof Colors.light;
  children: string;
  fontWeight?: "400" | "700";
};

export const TextButton = ({
  style,
  color = "primary",
  children,
  fontWeight = "400",
  ...props
}: TextButtonProps) => {
  const textColor = useThemeColor(color);

  return (
    <TouchableOpacity style={[styles.base, style]} {...props}>
      <Text color={color} style={{ color: textColor, fontWeight }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 4,
    alignSelf: "flex-end", // ideal para "Esqueceu a senha?"
  },
});
