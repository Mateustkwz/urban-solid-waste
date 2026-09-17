import { create } from "zustand";

import { UserRole } from "@constants/common";
import { Address } from "@frontend-types/common.type";
import { Reward } from "@frontend-types/reward.type";
import { User } from "@frontend-types/user.type";

type UserState = {
  isAuthenticated: boolean;
  user: User | null;
  addresses: Address[];
  rewards: Reward[];
  login: (user: User) => void;
  logout: () => void;
  setCurrentRole: (currentUser: User, role?: UserRole) => void;
  updateAddresses: (currentAddresses: Address[]) => void;
  updateRewards: (currentRewards: Reward[]) => void;
};

export const useUserStore = create<UserState>((set) => ({
  addresses: [],
  rewards: [],
  isAuthenticated: false,
  user: null,

  login: (user: User) =>
    set({
      isAuthenticated: true,
      user: user,
      addresses: (user.address || []) as Address[],
      rewards: user.rewards || ([] as Reward[]),
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      addresses: [],
      rewards: [],
      user: null,
    }),

  setCurrentRole: (currentUser: User, role?: UserRole) =>
    set({
      user: { ...currentUser, currentRole: role },
    }),

  updateAddresses: (currentAddresses: Address[]) =>
    set({
      addresses: currentAddresses,
    }),

  updateRewards: (currentRewards: Reward[]) =>
    set({
      rewards: currentRewards,
    }),
}));
