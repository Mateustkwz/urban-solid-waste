import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";

import { LinearGradient, RewardCard, Text, View } from "@components/ui";
import { Reward } from "@frontend-types/reward.type";
import { useDeliveryStore } from "@store/deliveryStore";
import { useUserStore } from "@store/userStore";
import { Radius, Size, Spacing } from "@theme/index";

export const rewardMocks: Reward[] = [
  {
    id: "1",
    img: "https://aromatherapynaturals.com/wp-content/uploads/2025/01/stylish_reusable_water_bottles.jpg", // garrafa reutilizável
    title: "Reusable Water Bottle",
    description: "A stylish eco-friendly bottle to reduce plastic waste.",
    requiredPoints: 100,
    available: false,
    used: true,
  },
  {
    id: "2",
    img: "https://ts2.mm.bing.net/th?id=OIP.YWxS9Z0_LuGf0YbNyIwkkwHaHa&pid=15.1&o=7&rm=3", // voucher/cartão
    title: "Discount Voucher",
    description: "10% off your next purchase at our partner stores.",
    requiredPoints: 200,
    available: true,
  },
  {
    id: "3",
    img: "https://ts3.mm.bing.net/th?id=OIP.b0IePsZNOrYf5OX7lHNknAHaHa&pid=15.1&o=7&rm=3", // bolsa de pano
    title: "Canvas Tote Bag",
    description: "Durable tote bag made from recycled materials.",
    requiredPoints: 150,
    available: true,
  },
  {
    id: "4",
    img: "https://ts3.mm.bing.net/th?id=OIP.AMLpITEqpmUtaRd2PRNwzgHaEc&pid=15.1&o=7&rm=3", // ingresso de cinema
    title: "Movie Ticket",
    description: "Enjoy a free movie session at selected cinemas.",
    requiredPoints: 300,
    available: true,
  },
];

export default function RewardScreen() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { deliveries } = useDeliveryStore();

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
  const [loading, setLoading] = useState(false);

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
            <Text variant="h3" color="background">
              {t("common.word.rewards")}
            </Text>
            <Text
              style={[styles.description]}
              variant="bodySmall"
              color="background"
            >
              {t("reward.description")}
            </Text>
          </View>
          <View style={styles.userInfoContainer}>
            <View style={styles.userInfoBackground} background="surface" />
            <View style={styles.pointsContainer}>
              <Text
                variant="bodySemiBold"
                style={Size.caption}
                color="textLight"
              >
                {t("reward.balance")}
              </Text>
              <Text variant="h1" color="surface">
                {`${new Intl.NumberFormat("pt-br").format(userTotalPoints)} ${t("common.word.pts")}`}
              </Text>
            </View>
            <View style={styles.pointsContainer}>
              <Text
                variant="bodySemiBold"
                style={Size.caption}
                color="textLight"
              >
                {t("common.word.rescued")}
              </Text>
              <Text variant="h1" color="accent" style={styles.totalRedeemed}>
                {3}
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.rewardFilterContainer}>
          {rewardMocks.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </View>
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
    height: Spacing.big * 4.3,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.big,
    marginTop: Spacing.massive,
    display: "flex",
    gap: Spacing.md,
  },
  description: {
    marginTop: Spacing.xs,
  },
  userInfoContainer: {
    marginTop: Spacing.xs,
    width: "100%",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfoBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.2,
    borderRadius: Radius.xl,
  },
  pointsContainer: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  totalRedeemed: { textAlign: "right" },
  rewardFilterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.lg,
    justifyContent: "center",
    paddingTop: Spacing.lg,
  },
});
