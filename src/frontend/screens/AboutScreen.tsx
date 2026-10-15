import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "@components/ui";
import { aboutText } from "@constants/common";
import { Spacing } from "@theme/spacing";
import { Size } from "@theme/typography";

import { associationMock } from "../../backend/storage/mock/associations.mock";

export default function AboutScreen() {
  return (
    <View style={styles.container} background="background">
      <Text
        variant="bodySemiBold"
        style={{
          lineHeight: 28,
          textAlign: "justify",
        }}
      >
        {aboutText}
      </Text>
      <View style={styles.cityHallContainer}>
        <Text variant="h1" style={[Size.subtitle, styles.cityHallTitle]}>
          {associationMock[2].name}
        </Text>
        <Text variant="bodySmall">
          {associationMock[2].address[0].street},{" "}
          {associationMock[2].address[0].number} -{" "}
          {associationMock[2].address[0].city},{" "}
          {associationMock[2].address[0].state}
        </Text>
        <Text variant="bodySmall">
          CEP: {associationMock[2].address[0].zipCode}
        </Text>
        <Text style={{ marginTop: Spacing.sm }} variant="bodySmall">
          Email: {associationMock[2].email}
        </Text>
        <Text variant="bodySmall">Tel: {associationMock[2].phoneNumber}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.xxl,
  },
  cityHallContainer: {
    paddingVertical: 16,
  },
  cityHallTitle: {
    paddingTop: Spacing.xxl,
    marginTop: Spacing.md,
    borderTopWidth: 1,
    marginBottom: Spacing.sm,
  },
});
