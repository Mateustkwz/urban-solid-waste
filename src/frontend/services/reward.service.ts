import rewardService from "@backend-services/reward.service";

const getRewards = async () => {
  return rewardService.getAllRewards();
};

const deleteReward = async (rewardId: string) => {
  return rewardService.deleteRewardById(rewardId);
};

const rescueSelectedReward = async (rewardId: string, userDocument: string) => {
  return rewardService.rescueReward(rewardId, userDocument);
};

const updateReward = async (
  rewardId: string,
  title: string,
  description: string,
  requiredPoints: number,
  available: boolean,
) => {
  return rewardService.updateCurrentReward(
    rewardId,
    title,
    description,
    requiredPoints,
    available,
  );
};

export { deleteReward, getRewards, rescueSelectedReward, updateReward };
