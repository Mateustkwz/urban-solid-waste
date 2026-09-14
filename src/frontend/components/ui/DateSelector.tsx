import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from ".";

type DateSelectorProps = {
  value: Date | null;
  onChange: (date: Date) => void;
};

export const DateSelector: React.FC<DateSelectorProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      {/* Field */}
      <TouchableOpacity style={styles.field} onPress={() => setOpen(true)}>
        <Text style={styles.fieldText}>
          {value ? value.toLocaleDateString() : "Selecione uma data"}
        </Text>
      </TouchableOpacity>

      {/* Modal with Date Picker */}
      <Modal visible={open} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display="spinner"
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  onChange(selectedDate);
                }
                setOpen(false);
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpen(false)}
            >
              <Text style={styles.closeText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
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
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "80%",
  },
  closeButton: {
    marginTop: 12,
    alignSelf: "flex-end",
  },
  closeText: {
    color: "#1565C0",
    fontWeight: "600",
  },
});
