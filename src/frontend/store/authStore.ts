import { create } from "zustand";

import { UserRole } from "@constants/common";
import { Address } from "@frontend-types/common.type";
import { User } from "@frontend-types/user.type";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  addresses: Address[];
  login: (user: User) => void;
  logout: () => void;
  setCurrentRole: (currentUser: User, role?: UserRole) => void;
  updateAddresses: (currentAddresses: Address[]) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  addresses: [],
  isAuthenticated: false,
  user: null,

  login: (user: User) =>
    set({
      isAuthenticated: true,
      user: user,
      addresses: (user.address || []) as Address[],
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      addresses: [],
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
}));
