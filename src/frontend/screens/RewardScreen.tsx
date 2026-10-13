import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import {
  ChipSelector,
  DialogConfirm,
  LinearGradient,
  RewardCard,
  Text,
  View,
} from "@components/ui";
import { rescueSelectedReward } from "@frontend-services/reward.service";
import { Reward } from "@frontend-types/reward.type";
import { handleErrorMessage, showToast } from "@frontend-utils/common.util";
import { useThemeColor } from "@hooks/useThemeColor";
import { useDeliveryStore } from "@store/deliveryStore";
import { useRewardStore } from "@store/rewardStore";
import { useUserStore } from "@store/userStore";
import { Radius, Size, Spacing } from "@theme/index";

const rewardFiltersType = ["Minhas Recompensas", "Recompensas Disponíveis"];

export default function RewardScreen() {
  const { t } = useTranslation();
  const { user, userRewards, updateRewards, updateUser } = useUserStore();
  const { deliveries } = useDeliveryStore();
  const { rewards } = useRewardStore();

  const bc = useThemeColor("primaryLight");

  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [confirmRescue, setConfirmRescue] = useState(false);
  const [rewardsFilter, setRewardsFilter] = useState(rewardFiltersType[0]);
  const [loading, setLoading] = useState(false);

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

  const rewardsToShow = useMemo(
    () => (rewardsFilter === "Minhas Recompensas" ? userRewards : rewards),
    [rewards, rewardsFilter, userRewards],
  );

  const handleReward = (reward: Reward) => {
    if (rewardsFilter === "Minhas Recompensas") {
      return;
    }

    setSelectedReward(reward);
    setConfirmRescue(true);
  };

  const handleCloseRescueDialog = () => {
    setSelectedReward(null);
    setConfirmRescue(false);
  };

  const handleRescueReward = async () => {
    setConfirmRescue(false);
    setLoading(true);

    try {
      if (selectedReward && user) {
        const updatedUser = await rescueSelectedReward(
          selectedReward.id,
          user.cpfOrCnpj,
        );

        updateUser({
          ...user,
          points: updatedUser.points,
          rewards: [...userRewards, ...updatedUser.rewards],
        });
        updateRewards(updatedUser.rewards);
      }
      setLoading(false);
    } catch (error) {
      showToast(
        "error",
        t("error.title.rewardRescue"),
        (handleErrorMessage(error) || error) as string,
      );
      setLoading(false);
    }
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
                {userRewards.length}
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.rewardSelectorContainer}>
          <ChipSelector
            categories={rewardFiltersType}
            onSelect={setRewardsFilter}
          />
        </View>
        <View style={styles.rewardFilterContainer}>
          {rewardsToShow.length ? (
            <>
              {rewardsToShow.map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  handleReward={handleReward}
                />
              ))}
            </>
          ) : (
            <Text style={{ marginTop: Spacing.md }}>
              Nenhuma recompensa{" "}
              {rewardsFilter === "Minhas Recompensas"
                ? "resgatada"
                : "disponível"}
              {"  "}
              :(
            </Text>
          )}
        </View>
        <DialogConfirm
          title="Deseja resgatar?"
          onCancel={handleCloseRescueDialog}
          onConfirm={handleRescueReward}
          message={selectedReward?.title ?? ""}
          visible={confirmRescue}
        />
        {loading ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingBackground} />
            <ActivityIndicator color={bc} size="large" />
          </View>
        ) : (
          <></>
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
  loadingContainer: {
    position: "absolute",
    zIndex: 999,
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
  },
  loadingBackground: {
    position: "absolute",
    backgroundColor: "#000",
    opacity: 0.3,
    width: "100%",
    height: "100%",
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
  rewardSelectorContainer: {
    alignItems: "center",
    marginTop: Spacing.md,
  },
  rewardFilterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.lg,
    justifyContent: "center",
    paddingTop: Spacing.lg,
    paddingBlock: Spacing.xxxl,
  },
});
