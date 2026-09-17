import { Reward } from "@backend-types/reward.type";
import { RewardModel } from "@models/reward.model";

export const toRewardModel = (reward: Reward): RewardModel => ({
  available: reward.available,
  description: reward.description,
  id: reward.id,
  required_points: reward.requiredPoints,
  title: reward.title,
  used: reward.used,
  img: reward.img,
});

export const toRewardData = (reward: RewardModel): Reward => ({
  available: reward.available,
  description: reward.description,
  id: reward.id,
  requiredPoints: reward.required_points,
  title: reward.title,
  used: reward.used,
  img: reward.img,
});
