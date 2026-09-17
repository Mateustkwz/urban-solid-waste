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
import { AppNavProp } from "@navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { useDeliveryStore } from "@store/deliveryStore";
import { Radius } from "@theme/radius";
import { Spacing } from "@theme/spacing";

export default function DeliveryScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<AppNavProp>();
  const { deliveries } = useDeliveryStore();

  const handleNewDelivery = (delivery?: DeliveryType) => {
    navigation.navigate("DeliveryForm", { delivery });
  };

  const handleEditDelivery = (delivery: DeliveryType) => {
    navigation.navigate("DeliveryForm", { delivery });
  };

  return (
    <View style={styles.deliveryContainer}>
      <FlatList
        data={deliveries}
        contentContainerStyle={{ gap: Spacing.sm }}
        renderItem={({ item }) => (
          <DeliveryCard
            key={item.id}
            data={item}
            handleDelivery={handleEditDelivery}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5} // triggers when 50% from bottom
      />
      <TouchableOpacity
        textColor="surface"
        borderRadius={Radius.huge}
        style={styles.buttonContainer}
        onPress={() => handleNewDelivery()}
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
