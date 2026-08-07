import { create } from "zustand";

import { User } from "@app-types/user.type";

type AuthState = {
  isAuthenticated: boolean;
  name: string | null;
  role: "CITIZEN" | "ASSOCIATION" | "CITY_HALL" | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  name: null,
  role: null,

  login: (user: User) =>
    set({
      isAuthenticated: true,
      name: user.name,
      role: user.role,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      name: null,
      role: null,
    }),
}));
