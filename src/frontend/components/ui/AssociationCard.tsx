import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

import { Address } from "@frontend-types/common.type";
import { User } from "@frontend-types/user.type";
import { Colors, Radius, Shadows, Size, Spacing } from "@theme/index";

import { Icon, Text, View } from "./";

export const AssociationCard = ({ data }: { data: User }) => {
  const { t } = useTranslation();

  if (!data.address || data.address.length === 0) {
    return null;
  }

  const associationAddress = data.address[0] as Address & {
    phoneNumber?: string;
  };

  return (
    <View style={styles.addressContainer} background="background">
      <View style={styles.addressIcon} background="cityHallBackground">
        <Icon name="Truck" color="cityHallIcon" />
      </View>
      <View style={styles.addressContent}>
        <Text variant="h1" style={Size.subtitle}>
          {associationAddress.name}
        </Text>
        <Text variant="body" color="textSecondary">
          {`${associationAddress.street}, ${associationAddress.number}`}
        </Text>
        <Text variant="h1" color="textLight" style={Size.bodySmall}>
          {`${associationAddress.zipCode} - ${associationAddress.city}, ${associationAddress.state}`}
        </Text>
        {associationAddress.complement && (
          <Text
            variant="bodySemiBold"
            style={[Size.bodySmall, styles.complement]}
            color="textSecondary"
          >
            {`${t("common.word.complement")}: ${associationAddress.complement}`}
          </Text>
        )}
        {associationAddress.phoneNumber && (
          <Text variant="h1" color="text" style={Size.bodySmall}>
            {associationAddress.phoneNumber}
          </Text>
        )}
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
});
