import { View as RNView, type ViewProps as RNViewProps } from "react-native";

import { useThemeColor } from "@hooks/useThemeColor";
import { Colors } from "@theme/index";

export type ViewProps = RNViewProps & {
  background?: keyof typeof Colors.light;
};

export const View = ({
  style,
  background = "transparent",
  ...props
}: ViewProps) => {
  const backgroundColor = useThemeColor(background);

  return (
    <RNView
      style={[
        {
          backgroundColor,
        },
        style,
      ]}
      {...props}
    />
  );
};
