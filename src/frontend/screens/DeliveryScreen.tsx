import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet } from "react-native";

import {
  DeliveryCard,
  Icon,
  Text,
  TouchableOpacity,
  View,
} from "@components/ui";
import { DeliveryType } from "@frontend-types/delivery.type";
import { AppNavigationProp } from "@frontend-types/navigation.type";
import { useNavigation } from "@react-navigation/native";
import { Radius } from "@theme/radius";
import { Spacing } from "@theme/spacing";

export default function DeliveryScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const { t } = useTranslation();

  const mockRecentDeliveries: DeliveryType[] = [
    {
      id: "2026-01",
      material: ["paper", "plastic"],
      associationId: "user-001",
      createdAt: "",
      updatedAt: "",
      updatedBy: "",
      userId: "",
      deliveryDate: {
        date: "2026-08-17",
        startTime: "08:00",
        endTime: "10:00",
      },
      quantity: 0.8,
      method: "home",
      unit: "kg",
      status: "collected",
      points: 85,
    },
    {
      id: "2026-02",
      material: ["paper", "plastic"],
      associationId: "user-002",
      createdAt: "",
      updatedAt: "",
      updatedBy: "",
      userId: "",
      deliveryDate: {
        date: "2026-08-29",
        startTime: "10:00",
        endTime: "12:00",
      },
      quantity: 0.8,
      method: "home",
      unit: "kg",
      status: "pending",
      points: 85,
    },
  ];

  const handleNewDelivery = () => {
    navigation.navigate("NewDelivery");
  };

  return (
    <View style={styles.deliveryContainer}>
      <FlatList
        data={mockRecentDeliveries}
        contentContainerStyle={{ gap: Spacing.sm }}
        renderItem={({ item }) => <DeliveryCard key={item.id} data={item} />}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5} // triggers when 50% from bottom
      />
      <TouchableOpacity
        textColor="surface"
        borderRadius={Radius.huge}
        style={styles.buttonContainer}
        onPress={handleNewDelivery}
      >
        <View style={styles.buttonContent}>
          <Icon name="Plus" />
          <Text color="surface">{t("delivery.newDelivery")}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  deliveryContainer: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    position: "relative",
  },
  buttonContainer: {
    width: "50%",
    position: "absolute",
    paddingVertical: Spacing.xl,
    bottom: Spacing.xxxl,
    right: Spacing.xl,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
});
