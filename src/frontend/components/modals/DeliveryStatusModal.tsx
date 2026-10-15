import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "@components/ui";
import { handleErrorMessage, showToast } from "@frontend-utils/common.util";
import { useThemeColor } from "@hooks/useThemeColor";

import { BaseModal } from "./BaseModal";

export type DeliveryStatus =
  "pending" | "confirmed" | "collected" | "cancelled";

type DeliveryStatusModalProps = {
  visible: boolean;
  onClose: () => void;
  currentStatus: DeliveryStatus;
  onConfirm: (status: DeliveryStatus) => Promise<void>;
};

const STATUS_OPTIONS: {
  value: DeliveryStatus;
  label: string;
  description: string;
  color: string;
  backgroundColor: string;
}[] = [
  {
    value: "pending",
    label: "Pendente",
    description: "Coleta está pendente de confirmação.",
    color: "#FBC02D",
    backgroundColor: "#FFF9E6",
  },
  {
    value: "confirmed",
    label: "Confirmada",
    description: "Coletada agendada.",
    color: "#1565C0",
    backgroundColor: "#E6F0FA",
  },
  {
    value: "collected",
    label: "Coletado",
    description: "Entrega foi coletada",
    color: "#2E7D32",
    backgroundColor: "#E6F4EA",
  },
  {
    value: "cancelled",
    label: "Cancelada",
    description: "Entrega foi cancelada.",
    color: "#D32F2F",
    backgroundColor: "#FDECEA",
  },
];

export const DeliveryStatusModal = ({
  visible,
  onClose,
  currentStatus,
  onConfirm,
}: DeliveryStatusModalProps) => {
  const { t } = useTranslation();

  const [selectedStatus, setSelectedStatus] =
    useState<DeliveryStatus>(currentStatus);
  const [loading, setLoading] = useState(false);

  const textColor = useThemeColor("text");
  const borderColor = useThemeColor("border");
  const primaryColor = useThemeColor("primary");

  const handleConfirm = async () => {
    setLoading(true);

    try {
      await onConfirm(selectedStatus);
    } catch (error) {
      showToast(
        "error",
        t("error.title.updateDeliveryStatus"),
        handleErrorMessage(error),
      );
    }

    setLoading(false);
    onClose();
  };

  return (
    <BaseModal visible={visible} onClose={onClose} padding={24}>
      <View style={styles.header}>
        <Text variant="h3">Atualize o status da entrega</Text>

        <Text variant="body" color="textSecondary">
          Selecione o novo status da entrega.
        </Text>
      </View>

      <View style={styles.options}>
        {STATUS_OPTIONS.filter((item) => item.value !== currentStatus).map(
          (status) => {
            const isSelected = selectedStatus === status.value;

            return (
              <Pressable
                key={status.value}
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected }}
                onPress={() => setSelectedStatus(status.value)}
                style={[
                  styles.option,
                  {
                    borderColor: isSelected ? status.color : borderColor,
                    backgroundColor: isSelected
                      ? `${status.color}12`
                      : "transparent",
                  },
                ]}
              >
                <View
                  style={[
                    styles.indicator,
                    {
                      borderColor: isSelected ? status.color : borderColor,
                    },
                  ]}
                >
                  {isSelected && (
                    <View
                      style={[
                        styles.indicatorSelected,
                        { backgroundColor: status.color },
                      ]}
                    />
                  )}
                </View>

                <View style={styles.optionContent}>
                  <Text
                    variant="body"
                    style={{ color: textColor, fontWeight: "600" }}
                  >
                    {status.label}
                  </Text>

                  <Text variant="caption" color="textSecondary">
                    {status.description}
                  </Text>
                </View>

                <View
                  style={[
                    styles.badge,
                    { backgroundColor: status.backgroundColor },
                  ]}
                >
                  <Text
                    variant="caption"
                    style={{
                      color: status.color,
                      fontWeight: "600",
                    }}
                  >
                    {status.label}
                  </Text>
                </View>
              </Pressable>
            );
          },
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={onClose}
          style={[styles.button, styles.cancelButton]}
        >
          <Text variant="body">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          onPress={handleConfirm}
          style={[styles.button, { backgroundColor: primaryColor, width: 100 }]}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text variant="body" style={styles.confirmText}>
              Confirm
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: 8,
  },
  options: {
    gap: 10,
    marginTop: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  indicator: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionContent: {
    flex: 1,
    gap: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 20,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#DDE5DA",
  },
  confirmText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
