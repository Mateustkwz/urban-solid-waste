// Modal.tsx
import {
  Modal as RNModal,
  StyleSheet,
  View,
  type ModalProps,
  type ViewStyle,
} from "react-native";

import { useThemeColor } from "@hooks/useThemeColor";

export type CustomModalProps = ModalProps & {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
};

export const BaseModal = ({
  visible,
  onClose,
  children,
  containerStyle,
  ...props
}: CustomModalProps) => {
  const backgroundColor = useThemeColor("surface");

  return (
    <RNModal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      {...props}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor }, containerStyle]}>
          {children}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    borderRadius: 12,
    padding: 16,
  },
});
