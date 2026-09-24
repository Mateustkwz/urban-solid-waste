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

export { deleteReward, getRewards, rescueSelectedReward };
