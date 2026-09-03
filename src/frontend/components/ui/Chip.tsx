import * as LucideIcons from "lucide-react-native";

import { Colors, Size } from "@theme/index";

import { Icon, Text, TouchableOpacity } from "./";

type ChipProps = {
  label: string;
  color: keyof typeof Colors.light;
  backgroundColor: keyof typeof Colors.light;
  icon?: string;
  onPress?: () => void;
};

export const Chip = ({
  label,
  icon,
  color,
  backgroundColor,
  onPress,
}: ChipProps) => (
  <TouchableOpacity
    onPress={onPress}
    backgroundColor={backgroundColor}
    borderColor={color}
    style={{
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 20,
      borderWidth: 1,
      paddingHorizontal: 12,
      paddingVertical: 6,
      gap: 8,
      alignSelf: "flex-start",
    }}
  >
    {Icon ? (
      <Icon name={icon as keyof typeof LucideIcons} size={16} color={color} />
    ) : (
      <></>
    )}
    <Text
      variant="caption"
      style={[Size.caption, { fontWeight: "bold" }]}
      color={color}
    >
      {label}
    </Text>
  </TouchableOpacity>
);
