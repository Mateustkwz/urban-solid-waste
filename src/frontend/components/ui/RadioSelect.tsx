import { useThemeColor } from "@hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Option = {
  label: string;
  value: string;
};

type RadioSelectProps = {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
  position?: "horizontal" | "vertical"; // default vertical
};

export const RadioSelect = ({
  options,
  selected,
  onChange,
  position = "vertical",
}: RadioSelectProps) => {
  const primary = useThemeColor("primary");
  const textColor = useThemeColor("text");
  const borderColor = useThemeColor("border");

  return (
    <View
      style={[styles.container, position === "horizontal" && styles.horizontal]}
    >
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          style={styles.option}
          onPress={() => onChange(opt.value)}
        >
          <View
            style={[
              styles.circle,
              { borderColor },
              selected === opt.value && { backgroundColor: primary },
            ]}
          />
          <Text style={[styles.label, { color: textColor }]}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  horizontal: {
    flexDirection: "row",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
  },
});
