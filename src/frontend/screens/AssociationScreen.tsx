import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { DeliveryStatus } from "@components/modals/DeliveryStatusModal";
import {
  DeliveryCard,
  DeliveryStatusModal,
  LinearGradient,
  ProfilePicture,
  Text,
  View,
} from "@components/ui";
import { statusPriority } from "@constants/common";
import { updateDeliveryStatus } from "@frontend-services/delivery.service";
import { DeliveryType } from "@frontend-types/delivery.type";
import { AppNavProp } from "@navigation/AppNavigator";
import { CitizenNavProp } from "@navigation/CitizenNavigator";
import { useDeliveryStore } from "@store/deliveryStore";
import { useUserStore } from "@store/userStore";
import { Colors, Radius, Shadows, Size, Spacing } from "@theme/index";

export default function AssociationScreen() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { deliveries, setDeliveries } = useDeliveryStore();
  const citizenNavigation = useNavigation<CitizenNavProp>();
  const appNavigation = useNavigation<AppNavProp>();

  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryType | null>(
    null,
  );

  const orderedDeliveries = useMemo(
    () =>
      deliveries.sort((a, b) => {
        const priorityA =
          statusPriority[a.status as keyof typeof statusPriority];
        const priorityB =
          statusPriority[b.status as keyof typeof statusPriority];

        // Ignore "delivery" — keep its position relative to other delivery items
        if (a.status === "delivery" || b.status === "delivery") {
          return 0;
        }

        return priorityA - priorityB;
      }),
    [deliveries],
  );

  const deliveredOnes = useMemo(
    () => deliveries.filter((deliv) => deliv.status === "collected"),
    [deliveries],
  );

  const handleProfile = () => {
    citizenNavigation.navigate("Profile");
  };

  const handleClose = () => {
    setSelectedDelivery(null);
  };

  const handleDeliveryCard = (delivery: DeliveryType): void => {
    if (delivery.status !== "cancelled" && delivery.status !== "collected") {
      setSelectedDelivery(delivery);
    } else {
      appNavigation.navigate("DeliveryDetails", { delivery });
    }
  };

  const handleSubmitUpdateStatus = async (status: DeliveryStatus) => {
    if (selectedDelivery === null || user === null) {
      return;
    }

    try {
      const updatedDeliveries = await updateDeliveryStatus(
        selectedDelivery.id,
        status,
        user.id,
        selectedDelivery.userId,
      );

      setDeliveries(updatedDeliveries);
    } catch (error) {}
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <LinearGradient
          style={styles.header}
          colors={["primary", "primaryLight"]}
        >
          <View>
            <Text variant="bodySmall" color="background">
              {t("citizen.hello", { name: user.name })}
            </Text>
            <Text
              style={[styles.headerTitle, Size.subtitle]}
              variant="h1"
              color="background"
            >
              {t("citizen.goodDay")}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.headerPicture}
            onPress={handleProfile}
          >
            <ProfilePicture name={user.name} />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          style={styles.pointsContainer}
          colors={["primary", "primaryLight", "primaryLight"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View background="surface" style={styles.bubble1} />
          <View background="surface" style={styles.bubble2} />
          <Text
            variant="bodySemiBold"
            style={styles.deliveryTitle}
            color="surface"
          >
            {t("association.deliveriesInfo")}
          </Text>
          <View style={[styles.deliveryContainer, styles.cardContainer]}>
            <View style={styles.customContainer}>
              <Text variant="h3" color="surface">
                {deliveredOnes.length}
              </Text>
              <Text variant="caption" color="surface">
                {t("common.word.collects")}
              </Text>
            </View>
            <View style={styles.customContainer}>
              <Text variant="h3" color="surface">
                {new Intl.NumberFormat("pt-br").format(
                  deliveredOnes.reduce((prev, next) => {
                    if (next.unit === "kg") {
                      return prev + Number(next.quantity);
                    }
                    return prev;
                  }, 0),
                )}
              </Text>
              <Text
                style={{ maxWidth: 60, textAlign: "center" }}
                variant="caption"
                color="surface"
              >
                {t("common.label.totalKgRecycle")}
              </Text>
            </View>
            <View style={styles.customContainer}>
              <Text variant="h3" color="surface">
                {new Intl.NumberFormat("pt-br").format(
                  deliveredOnes.reduce((prev, next) => {
                    if (next.unit === "unit") {
                      return prev + Number(next.quantity);
                    }

                    return prev;
                  }, 0),
                )}
              </Text>
              <Text
                style={{ maxWidth: 60, textAlign: "center" }}
                variant="caption"
                color="surface"
              >
                {t("common.label.totalUnitRecycle")}
              </Text>
            </View>
          </View>
        </LinearGradient>
        {orderedDeliveries.length ? (
          <View style={styles.contentContainer}>
            <View style={styles.recentDeliveriesContainer}>
              <Text variant="h2" style={Size.body}>
                {t("association.nextPickups")}
              </Text>
              {orderedDeliveries.map((delivery) => (
                <DeliveryCard
                  key={delivery.id}
                  data={delivery}
                  handleDelivery={handleDeliveryCard}
                />
              ))}
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
      {selectedDelivery ? (
        <DeliveryStatusModal
          currentStatus={selectedDelivery.status as DeliveryStatus}
          onClose={handleClose}
          visible
          onConfirm={handleSubmitUpdateStatus}
        />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    display: "flex",
  },
  header: {
    height: Spacing.big * 3.5,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxxl,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    marginTop: Spacing.sm,
  },
  headerPicture: {
    marginRight: Spacing.xs,
  },
  pointsContainer: {
    position: "relative",
    top: -Spacing.xxxl,
    alignSelf: "center",
    borderRadius: Radius.xxl,
    zIndex: 2,
    overflow: "hidden",
    paddingVertical: Spacing.xl,
  },
  bubble1: {
    position: "absolute",
    width: Spacing.massive * 2,
    height: Spacing.massive * 2,
    borderRadius: Radius.round,
    right: -Spacing.lg,
    top: -Spacing.lg,
    opacity: 0.12,
  },
  bubble2: {
    position: "absolute",
    width: Spacing.huge * 2,
    height: Spacing.huge * 2,
    borderRadius: Radius.round,
    right: Spacing.massive,
    bottom: -Spacing.xxxl,
    opacity: 0.12,
  },
  deliveryTitle: {
    paddingHorizontal: Spacing.huge,
    marginBottom: Spacing.lg,
  },
  deliveryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.huge,
    borderRadius: Radius.xxl,
  },
  customContainer: {
    alignItems: "center",
  },
  cardContainer: {
    position: "relative",
    width: "90%",
    alignSelf: "center",
    zIndex: 2,
  },
  contentContainer: {
    paddingHorizontal: Spacing.xl,
    top: -Spacing.xxxl,
  },
  nextDeliveryContainer: {
    width: "100%",
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    marginTop: Spacing.md,
    borderRadius: Radius.xl,
    borderColor: Colors.light.border,
    borderWidth: 1,
    ...Shadows.cardLight,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
  },
  nextDeliveryIcon: {
    padding: 14,
    borderRadius: Radius.lg,
  },
  nextDeliveryContent: {
    display: "flex",
    gap: Spacing.xs,
  },
  nextDeliveryChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.xs,
    maxWidth: "90%",
  },
  recentDeliveriesContainer: {
    marginTop: Spacing.lg,
  },
});
