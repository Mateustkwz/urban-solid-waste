import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Address } from "@frontend-types/common.type";
import { User } from "@frontend-types/user.type";
import { Colors, Radius, Shadows, Size, Spacing } from "@theme/index";

import { useThemeColor } from "@hooks/useThemeColor";
import { ProfilePicture, Text, View } from "./";

export const UserCard = ({ data }: { data: User }) => {
  const { t } = useTranslation();

  const bc = useThemeColor(data.block ? "redBackground" : "background");

  if (!data.address || data.address.length === 0) {
    return null;
  }

  const adress = data.address[0] as Address & {
    phoneNumber?: string;
  };

  return (
    <TouchableOpacity
      style={[
        styles.userContainer,
        data.block && styles.blocked,
        { backgroundColor: bc },
      ]}
    >
      <View style={styles.userIcon}>
        <ProfilePicture name={data.name} backgroundColor={"associationIcon"} />
      </View>
      <View style={styles.userContent}>
        <Text variant="h1" style={Size.body}>
          {data.name}
        </Text>
        <Text variant="bodySmall" color="textSecondary">
          {`${adress.street}, ${adress.number}`}
        </Text>
        <Text variant="h1" color="textLight" style={Size.bodySmall}>
          {`${adress.city}, ${adress.state}`}
        </Text>
        {adress.complement && (
          <Text
            variant="bodySemiBold"
            style={[Size.bodySmall, styles.complement]}
            color="textSecondary"
          >
            {`${t("common.word.complement")}: ${adress.complement}`}
          </Text>
        )}
        {adress.phoneNumber && (
          <Text variant="h1" color="text" style={Size.bodySmall}>
            {adress.phoneNumber}
          </Text>
        )}
      </View>
      {data.block ? (
        <View>
          <Text variant="bodySemiBold" color="error" style={Size.caption}>
            Bloqueado
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    width: "100%",
    padding: Spacing.lg,
    marginTop: Spacing.md,
    borderRadius: Radius.xl,
    borderColor: Colors.light.border,
    borderWidth: 1,
    ...Shadows.cardLight,
    display: "flex",
    flexDirection: "row",
    gap: Spacing.xl,
  },
  blocked: {
    borderColor: "red",
  },
  userIcon: {
    borderRadius: Radius.lg,
    marginTop: Spacing.xs,
  },
  userContent: {
    flex: 1,
  },
  userTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  userTitleRightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  complement: {
    marginTop: Spacing.xs,
  },
});
