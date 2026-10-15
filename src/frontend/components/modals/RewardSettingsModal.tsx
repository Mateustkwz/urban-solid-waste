import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Switch,
  TextInput,
} from "react-native";

import { Text, View } from "@components/ui";
import { useThemeColor } from "@hooks/useThemeColor";
import { BaseModal } from "./BaseModal";

export type RewardSettings = {
  points: number;
  title: string;
  description: string;
  enabled: boolean;
};

type RewardSettingsModalProps = {
  visible: boolean;
  onClose: () => void;
  initialValues: RewardSettings;
  onSave: (values: RewardSettings) => Promise<void>;
};

export const RewardSettingsModal = ({
  visible,
  onClose,
  initialValues,
  onSave,
}: RewardSettingsModalProps) => {
  const [points, setPoints] = useState(String(initialValues.points));
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [enabled, setEnabled] = useState(initialValues.enabled);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const textColor = useThemeColor("text");
  const secondaryTextColor = useThemeColor("textSecondary");
  const borderColor = useThemeColor("border");
  const inputBackground = useThemeColor("inputBackground");
  const primaryColor = useThemeColor("primary");

  useEffect(() => {
    if (!visible) return;

    setPoints(String(initialValues.points));
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setEnabled(initialValues.enabled);
    setError("");
  }, [visible, initialValues]);

  const handleSave = async () => {
    const parsedPoints = Number(points);

    setLoading(true);

    if (!title.trim()) {
      setError("Título é obrigatório.");
      return;
    }

    if (!description.trim()) {
      setError("Descrição é obrigatória.");
      return;
    }

    if (
      !points.trim() ||
      !Number.isSafeInteger(parsedPoints) ||
      parsedPoints < 0
    ) {
      setError("Quantidade de pontos inválida.");
      return;
    }

    await onSave({
      points: parsedPoints,
      title: title.trim(),
      description: description.trim(),
      enabled,
    });

    setLoading(false);

    onClose();
  };

  const inputStyle = [
    styles.input,
    {
      color: textColor,
      backgroundColor: inputBackground,
      borderColor,
    },
  ];

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={styles.header}>
        <Text variant="h1">Configuração de recompensa</Text>

        <Text variant="body" color="textSecondary">
          Atualize as informações da recompensa
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text variant="body">Título</Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Desconto no IPTU"
            placeholderTextColor={secondaryTextColor}
            style={inputStyle}
            maxLength={100}
          />
        </View>

        <View style={styles.field}>
          <Text variant="body">Descrição</Text>

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Receba 3% de desconto no seu IPTU"
            placeholderTextColor={secondaryTextColor}
            style={[...inputStyle, styles.descriptionInput]}
            multiline
            textAlignVertical="top"
            maxLength={500}
          />
        </View>

        <View style={styles.field}>
          <Text variant="body">Pontos para resgatar</Text>

          <TextInput
            value={points}
            onChangeText={(value) => setPoints(value.replace(/[^0-9]/g, ""))}
            placeholder="100"
            placeholderTextColor={secondaryTextColor}
            keyboardType="number-pad"
            style={inputStyle}
          />
        </View>

        <View style={styles.statusRow}>
          <Text variant="body">Habilitar/Desabilitar recompensa</Text>
          <Switch
            value={enabled}
            onValueChange={setEnabled}
            trackColor={{
              false: borderColor,
              true: primaryColor,
            }}
            accessibilityLabel="Ativar recompensa"
          />
        </View>

        {!!error && (
          <Text variant="caption" color="error">
            {error}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={onClose}
          style={[styles.button, styles.cancelButton, { borderColor }]}
        >
          <Text variant="body">Cancel</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={handleSave}
          style={[styles.button, { backgroundColor: primaryColor }]}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text variant="body" style={styles.saveText}>
              Save changes
            </Text>
          )}
        </Pressable>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: 8,
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 8,
  },
  input: {
    minHeight: 46,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  descriptionInput: {
    minHeight: 96,
  },
  statusRow: {
    alignItems: "flex-start",
  },
  statusText: {
    flex: 1,
    gap: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 16,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
  },
  cancelButton: {
    borderWidth: 1,
  },
  saveText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
