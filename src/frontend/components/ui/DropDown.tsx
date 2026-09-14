import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  type ViewProps,
} from "react-native";

import { Icon, Text, View } from "./";

type Option = {
  id: string;
  label: string;
};

type DropdownProps = ViewProps & {
  options: Option[];
  selected: Option | null;
  onChange: (option: Option) => void;
  label?: string;
  errorMessage?: string;
  required?: boolean;
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onChange,
  label,
  errorMessage,
  required,
  style,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={style}>
      {/* Label */}
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

      {/* Field */}
      <TouchableOpacity style={styles.field} onPress={() => setOpen(true)}>
        <Text style={styles.fieldText}>
          {selected ? selected.label : "Selecione uma opção"}
        </Text>
        <Icon name="ChevronDown" color="text" size={20} />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal visible={open} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected?.id === item.id && styles.selected,
                    ]}
                    color={selected?.id === item.id ? "primary" : "text"}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpen(false)}
            >
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
  },
  field: {
    borderWidth: 1,
    borderColor: "#DDE5DA",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldText: {
    fontSize: 14,
    color: "#333",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 12,
    alignSelf: "flex-end",
  },
  closeText: {
    color: "#1565C0", // your blue accent
    fontWeight: "600",
  },
  selected: { fontWeight: 700 },
});
