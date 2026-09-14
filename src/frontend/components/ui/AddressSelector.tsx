import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";

import { Address } from "@frontend-types/common.type";
import { useThemeColor } from "@hooks/useThemeColor";
import { Size } from "@theme/typography";

import { Icon, Text, TextButton, View } from "./";

type AddressSelectorProps = {
  addresses: Address[];
  selected: Address;
  method: "association" | "home";
  onChange: (address: Address) => void;
};

export const AddressSelector: React.FC<AddressSelectorProps> = ({
  addresses,
  selected,
  onChange,
  method,
}) => {
  const { t } = useTranslation();

  const labelBackgroundColor = useThemeColor("componentBackground");
  const borderColor = useThemeColor("border");

  const [open, setOpen] = useState(false);

  return (
    <View style={styles.addressSelectorContainer}>
      <Text variant="bodySmall">{t(`delivery.method.${method}`)}</Text>
      <TouchableOpacity
        style={[styles.field, { backgroundColor: labelBackgroundColor }]}
        onPress={() => setOpen(true)}
      >
        <Icon name="MapPin" color="primary" size={16} />
        <Text variant="h1" style={[styles.fieldText, Size.bodySmall]}>
          {`${selected.street}, ${selected.number}`}
        </Text>
        <Icon name="ChevronRight" color="text" size={16} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownText} variant="subtitle">
              Escolha um endereço
            </Text>
            {addresses.map((address) => (
              <TouchableOpacity
                style={[styles.optionsContainer, { borderColor: borderColor }]}
                key={`address-selector-${address.id}`}
                onPress={() => {
                  onChange(address);
                }}
              >
                <View
                  style={styles.radioOption}
                  borderColor="border"
                  background={
                    selected.id === address.id
                      ? "associationIcon"
                      : "background"
                  }
                >
                  <View
                    style={styles.middleRadioOption}
                    background="background"
                  />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text>{`${address.street}, ${address.number}`}</Text>
                  <Text
                    variant="bodySmall"
                    color="textLight"
                  >{`CEP: ${address.zipCode} - ${address.city}, ${address.state}`}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <View style={{ marginTop: 24 }} />
            {method === "home" && (
              <TextButton
                backgroundColor="associationIcon"
                color="associationBackground"
                style={styles.registerNewAddressButton}
                alignSelf="center"
              >
                Adicionar novo endereço
              </TextButton>
            )}
            <TextButton
              backgroundColor="associationBackground"
              color="associationIcon"
              style={styles.closeButton}
              onPress={() => setOpen(false)}
              alignSelf="center"
            >
              Fechar
            </TextButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addressSelectorContainer: {
    marginTop: 6,
  },
  field: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
    alignSelf: "flex-start",
    borderRadius: 8,
  },
  fieldText: { fontSize: 14, color: "#333" },
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
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  dropdownText: { marginBottom: 2 },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 16,
  },
  radioOption: {
    borderWidth: 1,
    width: 18,
    height: 18,
    top: 4,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  middleRadioOption: {
    width: 6,
    height: 6,
    borderRadius: "50%",
  },
  optionTextContainer: {},
  optionText: { fontSize: 16, color: "#333" },
  registerNewAddressButton: {
    alignSelf: "auto",
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 8,
  },
  closeButton: {
    alignSelf: "auto",
    alignItems: "center",
    borderRadius: 6,
    marginTop: 8,
    paddingVertical: 8,
  },
});
