import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  ViewProps,
} from "react-native";

import { Text, View } from "@components/ui";
import { blockUser, unblockUser } from "@frontend-services/user.service";
import { User } from "@frontend-types/user.type";
import { handleErrorMessage, showToast } from "@frontend-utils/common.util";
import { useThemeColor } from "@hooks/useThemeColor";
import { useCityHallStore } from "@store/cityHallStore";
import { Size } from "@theme/typography";

import { BaseModal } from "./BaseModal";

type BlockUserModalProps = ViewProps & {
  visible: boolean;
  onClose: () => void;
  user: User;
};

export const BlockUserModal = ({
  visible,
  onClose,
  user,
  style,
  ...props
}: BlockUserModalProps) => {
  const { t } = useTranslation();

  const { setUserList } = useCityHallStore();
  const primaryColor = useThemeColor("primary");
  const errorColor = useThemeColor("error");
  const borderColor = useThemeColor("border");

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    try {
      const updatedUserList = user.block
        ? await unblockUser(user.id)
        : await blockUser(user.id);

      setUserList(updatedUserList);
    } catch (error) {
      showToast(
        "error",
        t(`error.title.${user.block ? "blockUser" : "unblockUser"}`),
        handleErrorMessage(error),
      );
    }

    setLoading(false);
    onClose();
  };

  return (
    <BaseModal visible={visible} onClose={onClose} style={style} {...props}>
      <View style={styles.content}>
        <Text variant="h3" style={Size.subtitle}>
          {`Deseja ${user.block ? "desbloquear" : "bloquear"} o usuário: ${user.name}?`}
        </Text>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={[styles.button, styles.cancelButton, { borderColor }]}
          >
            <Text variant="body">Cancelar</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handleConfirm}
            style={[
              styles.button,
              { backgroundColor: user.block ? primaryColor : errorColor },
            ]}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text variant="body" style={styles.confirmText}>
                Confirmar
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 24,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 116,
  },
  cancelButton: {
    borderWidth: 1,
  },
  confirmText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
