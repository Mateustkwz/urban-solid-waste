import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { useThemeColor } from "@hooks/useThemeColor";
import { Colors } from "@theme/colors";

type ProgressBarProps = ViewProps & {
  progress: number; // value between 0 and 1
  height?: number;
  backgroundColor?: keyof typeof Colors.light;
  fillColor?: keyof typeof Colors.light;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 20,
  backgroundColor = "citizenBackground", // light green
  fillColor = "primary", // dark green
  ...props
}) => {
  const bgc = useThemeColor(backgroundColor);
  const color = useThemeColor(fillColor);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bgc, height, borderRadius: height / 2 },
      ]}
      {...props}
    >
      <View
        style={{
          width: `${Math.min(Math.max(progress, 0), 1) * 100}%`,
          backgroundColor: color,
          height,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
});
