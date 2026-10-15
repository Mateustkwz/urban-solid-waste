import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

import { materials } from "@constants/common";

import { Chip, Icon, Text } from "./";

type Option = {
  id: string;
  label: string;
};

type MultiSelectProps = {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label?: string;
  errorMessage?: string;
  required?: boolean;
};

export const MultiSelectDropdown: React.FC<MultiSelectProps> = ({
  label,
  options,
  selected,
  onChange,
  errorMessage,
  required = false,
}) => {
  const [open, setOpen] = useState(false);

  const toggleSelection = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <View>
      {/* Field */}
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
      <TouchableOpacity
        style={[
          styles.field,
          { borderColor: errorMessage ? "red" : "#DDE5DA" },
        ]}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.fieldText}>
          {selected.length > 0
            ? selected
                .map((id) => options.find((opt) => opt.id === id)?.label)
                .filter(Boolean)
                .join(", ")
            : "Selecione opções"}
        </Text>
      </TouchableOpacity>
      {errorMessage && (
        <View style={styles.errorContainer}>
          <Icon
            style={styles.errorIcon}
            name="TriangleAlert"
            color="error"
            size={18}
          />
          <Text style={styles.errorMessage} variant="bodySmall" color="error">
            {errorMessage}
          </Text>
        </View>
      )}

      {/* Dropdown Modal */}
      <Modal visible={open} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.dropdown}>
            <View style={styles.optionList}>
              {options.map((option) => (
                <Chip
                  backgroundColor={
                    selected.includes(option.id)
                      ? materials[option.id].color
                      : "surface"
                  }
                  color={selected.includes(option.id) ? "surface" : "icon"}
                  key={`material-selection-${option.id}`}
                  label={option.label}
                  onPress={() => toggleSelection(option.id)}
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpen(false)}
            >
              <Text style={styles.closeText}>Confirmar</Text>
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
    marginBottom: 8,
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
    padding: 20,
  },
  optionList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  closeText: {
    color: "#1565C0",
    fontWeight: "600",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  errorContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
