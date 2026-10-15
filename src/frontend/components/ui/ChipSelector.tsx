import { useThemeColor } from "@hooks/useThemeColor";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

type ChipSelectorProps = {
  categories: string[];
  onSelect: (category: string) => void;
};

export const ChipSelector: React.FC<ChipSelectorProps> = ({
  categories,
  onSelect,
}) => {
  const selectedColor = useThemeColor("primary");
  const unselectedColor = useThemeColor("surface");

  const [selected, setSelected] = useState<string>(categories[0]);

  const handlePress = (category: string) => {
    setSelected(category);
    onSelect(category);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.button,
            {
              backgroundColor:
                selected === cat ? selectedColor : unselectedColor,
            },
            selected === cat && styles.buttonUnselected,
          ]}
          onPress={() => handlePress(cat)}
        >
          <Text
            style={[
              styles.text,
              selected === cat ? styles.textSelected : styles.textUnselected,
            ]}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flexGrow: 1,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  buttonUnselected: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
  textSelected: {
    color: "#fff",
  },
  textUnselected: {
    color: "#333",
  },
});
