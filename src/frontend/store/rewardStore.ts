import { create } from "zustand";

import { Reward } from "@frontend-types/reward.type";

type RewardState = {
  rewards: Reward[];
  setRewards: (rewards: Reward[]) => void;
};

export const useRewardStore = create<RewardState>((set) => ({
  rewards: [],

  setRewards: (newRewards: Reward[]) =>
    set({
      rewards: newRewards,
    }),
}));
