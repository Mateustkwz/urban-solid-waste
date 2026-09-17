import AsyncStorage from "@react-native-async-storage/async-storage";

import { Reward } from "@backend-types/reward.type";
import { delay } from "@backend-utils/common.util";
import { toRewardData, toRewardModel } from "@backend-utils/rewardData.util";
import { RewardSchema } from "@storage/reward.storage";

const createReward = async (reward: Reward) => {
  const data = await AsyncStorage.getItem("@reward");

  const rewards: RewardSchema = data ? JSON.parse(data) : { "@reward": {} };

  rewards["@reward"][reward.id] = toRewardModel(reward);

  await AsyncStorage.setItem(`@reward`, JSON.stringify(rewards));
  await delay();

  return Object.values(rewards["@reward"]).map((item) => toRewardData(item));
};

const updateReward = async (reward: Reward) => {
  const data = await AsyncStorage.getItem("@reward");

  const rewards: RewardSchema = data ? JSON.parse(data) : { "@reward": {} };

  rewards["@reward"][reward.id] = toRewardModel(reward);

  await AsyncStorage.setItem("@reward", JSON.stringify(rewards));

  await delay();

  return Object.values(rewards["@reward"]).map((item) => toRewardData(item));
};

const getRewards = async () => {
  const data = await AsyncStorage.getItem("@reward");

  if (!data) {
    return null;
  }

  const rewards: RewardSchema = JSON.parse(data);
  await delay();

  return Object.values(rewards["@reward"]).map((item) => toRewardData(item));
};

const deleteReward = async (rewardId: string) => {
  const data = await AsyncStorage.getItem("@reward");

  if (!data) {
    return;
  }

  const rewards: RewardSchema = JSON.parse(data);

  delete rewards["@reward"][rewardId];
  await delay();

  await AsyncStorage.setItem("@reward", JSON.stringify(rewards));
};

export { createReward, deleteReward, getRewards, updateReward };
