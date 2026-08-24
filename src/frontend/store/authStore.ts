import { create } from "zustand";

import { UserRole } from "@constants/common";
import { User } from "@frontend-types/user.type";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setCurrentRole: (currentUser: User, role?: UserRole) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (user: User) =>
    set({
      isAuthenticated: true,
      user: user,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),

  setCurrentRole: (currentUser: User, role?: UserRole) =>
    set({
      user: { ...currentUser, currentRole: role },
    }),
}));
