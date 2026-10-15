import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";

import { RewardSettings } from "@components/modals/RewardSettingsModal";
import { RewardCard, RewardSettingsModal, View } from "@components/ui";
import { updateReward } from "@frontend-services/reward.service";
import { Reward } from "@frontend-types/reward.type";
import { handleErrorMessage, showToast } from "@frontend-utils/common.util";
import { useRewardStore } from "@store/rewardStore";
import { Spacing } from "@theme/spacing";

export default function ManageRewardsScreen() {
  const { t } = useTranslation();
  const { rewards, setRewards } = useRewardStore();

  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const handleReward = (reward: Reward) => {
    setSelectedReward(reward);
  };

  const handleSubmit = async (data: RewardSettings) => {
    if (!selectedReward) {
      return;
    }

    try {
      console.log(data);
      const updatedRewards = await updateReward(
        selectedReward?.id,
        data.title,
        data.description,
        data.points,
        data.enabled,
      );

      setRewards(updatedRewards);
    } catch (error) {
      showToast(
        "error",
        t("error.title.updateReward"),
        handleErrorMessage(error),
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.rewardContainer}>
        {rewards.map((item) => (
          <RewardCard
            key={item.id}
            reward={item}
            handleReward={handleReward}
            canBeDisabled={false}
          />
        ))}
      </View>
      {selectedReward && (
        <RewardSettingsModal
          visible={!!selectedReward}
          initialValues={{
            description: selectedReward.description,
            enabled: selectedReward.available,
            points: selectedReward.requiredPoints,
            title: selectedReward.title,
          }}
          onClose={() => setSelectedReward(null)}
          onSave={handleSubmit}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rewardContainer: {
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
