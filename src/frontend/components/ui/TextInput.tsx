import * as LucideIcons from "lucide-react-native";
import { useState } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  type TextInputProps as RNTextInputProps,
} from "react-native";

import { useThemeColor } from "@hooks/useThemeColor";
import type { Colors } from "@theme/index";

import { Icon, Text, View } from "./";

type IconSymbolName = keyof typeof LucideIcons;

export type InputProps = RNTextInputProps & {
  borderColor?: keyof typeof Colors.light;
  backgroundColor?: keyof typeof Colors.light;
  iconColor?: keyof typeof Colors.light;
  textColor?: keyof typeof Colors.light;
  secureteIcon?: boolean;
  icon?: IconSymbolName;
  errorMessage?: string | null;
  label?: string;
  required?: boolean;
};

export const TextInput = ({
  style,
  label,
  borderColor = "transparent",
  backgroundColor = "inputBackground",
  textColor = "text",
  iconColor = "text",
  maxLength = 32,
  secureteIcon = false,
  errorMessage = null,
  required = false,
  icon,
  ...props
}: InputProps) => {
  const [secureteVisible, setSecureteVisible] = useState(secureteIcon);

  const border = useThemeColor(borderColor);
  const bg = useThemeColor(backgroundColor);
  const color = useThemeColor(textColor);
  const iColor = useThemeColor(iconColor);
  const errorColor = useThemeColor("error");

  return (
    <View style={styles.container} background="transparent">
      {label && (
        <Text
          color={errorMessage ? "error" : "text"}
          variant="bodySmall"
          style={styles.label}
        >
          {label}
          {required ? <Text color="error">*</Text> : <></>}
        </Text>
      )}
      {!!icon && (
        <Icon
          style={[styles.icon, styles.customIcon]}
          name={icon}
          color={iColor}
          size={20}
        />
      )}
      <RNTextInput
        style={[
          styles.base,
          {
            borderColor: errorMessage ? errorColor : border,
            backgroundColor: bg,
            color,
            paddingLeft: !!icon ? 40 : 12,
          },
          style,
        ]}
        maxLength={maxLength}
        placeholderTextColor={useThemeColor("textSecondary")}
        secureTextEntry={secureteVisible}
        {...props}
      />
      {errorMessage && (
        <View style={styles.errorContainer}>
          <Icon
            style={styles.errorIcon}
            name="TriangleAlert"
            color={errorColor}
            size={18}
          />
          <Text style={styles.errorMessage} variant="bodySmall" color="error">
            {errorMessage}
          </Text>
        </View>
      )}
      {secureteIcon && (
        <Icon
          style={[styles.secureteIcon, styles.icon]}
          name={!secureteVisible ? "EyeIcon" : "EyeOffIcon"}
          color={color}
          onPress={() => setSecureteVisible(!secureteVisible)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  label: {
    marginBottom: 4,
    paddingLeft: 4,
    fontFamily: "Nunito-SemiBold",
  },
  icon: {
    position: "absolute",
    zIndex: 2,
  },
  customIcon: {
    left: 12,
    top: 40,
  },
  secureteIcon: {
    top: 38,
    right: 20,
  },
  base: {
    padding: 12,
    zIndex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    gap: 6,
    paddingBottom: 8,
  },
  errorMessage: {
    fontFamily: "Nunito-Bold",
  },
  errorIcon: {
    bottom: 1,
  },
});
