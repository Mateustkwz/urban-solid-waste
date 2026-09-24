import * as Crypto from "expo-crypto";

import { Reward } from "@backend-types/reward.type";
import { convertUserDataToModel } from "@backend-utils/userData.util";
import {
  createConflictError,
  createNotFoundError,
  errorMessages,
} from "@constants/errors";
import {
  createMockRewards,
  createReward,
  deleteReward,
  getRewards,
  updateReward,
} from "@repositories/reward.repository";
import userRepository from "@repositories/user.repository";
import { rewardMocks } from "@storage/mock/rewards.mock";
import userService from "./user.service";

const getAllRewards = async (): Promise<Reward[]> => {
  const rewards = await getRewards();

  if (!rewards) {
    return [];
  }

  return rewards;
};

const createNewReward = async (reward: Reward) => {
  const rewards = await getRewards();

  if (rewards?.find((item) => item.id === reward.id)) {
    throw new Error(createConflictError(errorMessages.rewardAlreadyExists));
  }

  const newReward = { ...reward, id: await Crypto.randomUUID() };

  const updatedRewards = await createReward(newReward);

  return updatedRewards;
};

const getRewardById = async (rewardId: string): Promise<Reward | null> => {
  const rewards = await getRewards();

  const reward = rewards?.find((item) => item.id === rewardId);

  if (!reward) {
    throw new Error(createNotFoundError(errorMessages.rewardNotFound));
  }

  return reward;
};

const updateCurrentReward = async (
  rewardId: string,
  title?: string,
  description?: string,
  requiredPoints?: number,
  available?: boolean,
) => {
  const rewards = await getRewards();
  const currentReward = rewards?.find((item) => item.id === rewardId);

  if (!currentReward) {
    throw new Error(createNotFoundError(errorMessages.rewardNotFound));
  }

  if (title) {
    currentReward.title = title;
  }

  if (description) {
    currentReward.description = description;
  }

  if (requiredPoints) {
    currentReward.requiredPoints = requiredPoints;
  }

  if (available) {
    currentReward.available = available;
  }

  const updatedRewards = await updateReward(currentReward);

  return updatedRewards;
};

const rescueReward = async (rewardId: string, userDocument: string) => {
  const [reward, user] = await Promise.all([
    getRewardById(rewardId),
    userService.getUserByDocument(userDocument),
  ]);
  console.log(reward, user);
  if (!reward) {
    throw new Error(createNotFoundError(errorMessages.rewardNotFound));
  }

  if (!user) {
    throw new Error(createNotFoundError(errorMessages.userNotFound));
  }

  if ((user.points ?? 0) < reward.requiredPoints) {
    throw new Error(createConflictError(errorMessages.insuficientPoints));
  }

  const updatedUser = convertUserDataToModel({ ...user, rewards: [reward] });

  await userRepository.updateRewards(updatedUser);

  return { ...user, rewards: [reward] };
};

const deleteRewardById = async (rewardId: string) => {
  const reward = await getRewardById(rewardId);

  if (!reward) {
    throw new Error(createNotFoundError(errorMessages.rewardNotFound));
  }

  return await deleteReward(rewardId);
};

const loadMockRewards = async () => {
  try {
    let rewards = [];

    for (const reward of rewardMocks) {
      const newReward = {
        ...reward,
        id: await Crypto.randomUUID(),
      };

      rewards.push(newReward);
    }

    await createMockRewards(rewards);
  } catch (error) {
    console.log("Erro ao inserir mock de rewards no storage: ", error);
  }
};

export default {
  getAllRewards,
  createNewReward,
  updateCurrentReward,
  rescueReward,
  getRewardById,
  loadMockRewards,
  deleteRewardById,
};
