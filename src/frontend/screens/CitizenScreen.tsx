import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import {
  Chip,
  DeliveryCard,
  Icon,
  LinearGradient,
  ProfilePicture,
  Text,
  View,
} from "@components/ui";
import { materials } from "@constants/common";
import { DeliveryType } from "@frontend-types/delivery.type";
import { formatSchedule } from "@frontend-utils/date.util";
import { getEcoLevel } from "@frontend-utils/points.util";
import { AppNavProp } from "@navigation/AppNavigator";
import { CitizenNavProp } from "@navigation/CitizenNavigator";
import { useDeliveryStore } from "@store/deliveryStore";
import { useUserStore } from "@store/userStore";
import { Colors, Radius, Shadows, Size, Spacing } from "@theme/index";

export default function CitizenScreen() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { deliveries } = useDeliveryStore();
  const appNavigation = useNavigation<AppNavProp>();
  const citizenNavigation = useNavigation<CitizenNavProp>();

  const deliveredOnes = useMemo(
    () => deliveries.filter((deliv) => deliv.status === "collected"),
    [deliveries],
  );
  const userTotalPoints = useMemo(
    () =>
      (user?.points || 0) +
      deliveredOnes.reduce((prev, next) => prev + (next.points || 0), 0),
    [user, deliveredOnes],
  );

  const handleProfile = () => {
    citizenNavigation.navigate("Profile");
  };

  const handleEditDelivery = (delivery: DeliveryType) => {
    appNavigation.navigate("DeliveryForm", { delivery });
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
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
              style={[styles.headerTitle, Size.h3]}
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
            style={Size.bodySmall}
            color="background"
          >
            {t("citizen.yourPoints")}
          </Text>
          <View style={styles.pointsTextContainer}>
            <Text style={Size.huge} variant="h1" color="background">
              {new Intl.NumberFormat("pt-br").format(userTotalPoints || 0)}
            </Text>
            <Text variant="bodyMedium" style={styles.pts} color="background">
              {t("common.word.pts")}
            </Text>
          </View>
          <View>
            <Text
              variant="bodySemiBold"
              style={Size.bodySmall}
              color="background"
            >
              {t("citizen.level", {
                level: getEcoLevel(userTotalPoints || 0).level,
              })}
            </Text>
          </View>
        </LinearGradient>
        {deliveries.length && (
          <View style={styles.contentContainer}>
            <Text variant="h2" style={Size.body}>
              {t("citizen.nextDelivery")}
            </Text>

            <View
              style={styles.nextDeliveryContainer}
              background="componentBackground"
            >
              <View style={styles.nextDeliveryIcon} background="primary">
                <Icon name="Truck" />
              </View>
              <View style={styles.nextDeliveryContent}>
                <Text variant="h1" style={Size.body}>
                  {`${t("common.word.collect")} ${t("common.word.schedulled")}`}
                </Text>
                <Text color="textSecondary" style={Size.caption}>
                  {formatSchedule(deliveries[0].deliveryDate)}
                </Text>
                <View style={styles.nextDeliveryChipsContainer}>
                  {deliveries[0].material.map((material) => (
                    <Chip key={material} {...materials[material]} />
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.recentDeliveriesContainer}>
              <Text variant="h2" style={Size.body}>
                {t("citizen.recentDeliveries")}
              </Text>
              {deliveries.map((delivery) => (
                <DeliveryCard
                  key={delivery.id}
                  data={delivery}
                  handleDelivery={handleEditDelivery}
                />
              ))}
            </View>
          </View>
        )}
      </View>
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
    paddingTop: Spacing.lg,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    marginTop: 1,
  },
  headerPicture: {
    marginRight: Spacing.xs,
  },
  pointsContainer: {
    position: "relative",
    width: "90%",
    top: -Spacing.massive,
    alignSelf: "center",
    borderRadius: Radius.xxl,
    zIndex: 2,
    overflow: "hidden",
    paddingHorizontal: Spacing.xl,
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
  pointsTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: Spacing.md,
  },
  pts: {
    paddingBottom: Spacing.sm,
    marginLeft: Spacing.xs,
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
