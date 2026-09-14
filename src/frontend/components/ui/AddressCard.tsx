import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

import { Address } from "@frontend-types/common.type";
import { Colors, Radius, Shadows, Size, Spacing } from "@theme/index";

import { Icon, Text, TextButton, View } from "./";

export const AddressCard = ({
  data,
  onEdit,
}: {
  data: Address;
  onEdit: (address: Address) => void;
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.addressContainer} background="background">
      <View style={styles.addressIcon} background="associationBackground">
        <Icon name="House" color="associationIcon" />
      </View>
      <View style={styles.addressContent}>
        <Text variant="h1" style={Size.subtitle}>
          {data.name}
        </Text>
        <Text variant="body" color="textSecondary">
          {`${data.street}, ${data.number}`}
        </Text>
        <Text variant="h1" color="textLight" style={Size.bodySmall}>
          {`${data.zipCode} - ${data.city}, ${data.state}`}
        </Text>
        {data.complement && (
          <Text
            variant="bodySemiBold"
            style={[Size.bodySmall, styles.complement]}
            color="textSecondary"
          >
            {`${t("common.word.complement")}: ${data.complement}`}
          </Text>
        )}
        <TextButton
          style={styles.editButton}
          alignSelf="flex-start"
          color="associationIcon"
          onPress={() => onEdit(data)}
        >
          {t("common.word.edit")}
        </TextButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    width: "100%",
    padding: Spacing.lg,
    marginTop: Spacing.md,
    borderRadius: Radius.xl,
    borderColor: Colors.light.border,
    borderWidth: 1,
    ...Shadows.cardLight,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.xxl,
  },
  addressIcon: {
    padding: 14,
    borderRadius: Radius.lg,
    top: Spacing.sm,
  },
  addressContent: {
    flex: 1,
  },
  addressTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  addressTitleRightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  complement: {
    marginTop: Spacing.xs,
  },
  editButton: {
    marginTop: Spacing.sm,
  },
});
