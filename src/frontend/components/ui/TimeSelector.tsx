import { Picker } from "@react-native-picker/picker"; // install: npm install @react-native-picker/picker
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TimeSelectorProps = {
  value: string | null; // format "HH:mm"
  onChange: (time: string) => void;
};

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState(
    !!value ? parseInt(value.split(":")[0]) : new Date().getHours(),
  );
  const [minute, setMinute] = useState(
    !!value ? parseInt(value.split(":")[1]) : 0,
  );

  const handleConfirm = () => {
    const formatted = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    onChange(formatted);
    setOpen(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.field} onPress={() => setOpen(true)}>
        <Text style={styles.fieldText}>{value || "Selecione um horário"}</Text>
      </TouchableOpacity>

      {open && (
        <Modal visible={open} transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.pickerContainer}>
              <Text style={styles.title}>Escolha o horário</Text>
              <View style={styles.pickersRow}>
                <Picker
                  selectedValue={hour}
                  style={styles.picker}
                  onValueChange={(val) => setHour(Number(val))}
                >
                  {Array.from({ length: 22 }, (_, i) => (
                    <Picker.Item
                      key={i}
                      label={String(i).padStart(2, "0")}
                      value={i}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={minute}
                  style={styles.picker}
                  onValueChange={(val) => setMinute(val)}
                >
                  <Picker.Item label="00" value={0} />
                  <Picker.Item label="30" value={30} />
                </Picker>
              </View>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setOpen(false)}
              >
                <Text style={styles.closeText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff",
  },
  fieldText: { fontSize: 14, color: "#333" },
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
  title: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  pickersRow: { flexDirection: "row", justifyContent: "space-around" },
  picker: { width: 100 },
  confirmButton: {
    marginTop: 12,
    backgroundColor: "#1565C0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmText: { color: "#fff", fontWeight: "600" },
  closeButton: { marginTop: 8, alignSelf: "flex-end" },
  closeText: { color: "#F28C38", fontWeight: "600" },
});
