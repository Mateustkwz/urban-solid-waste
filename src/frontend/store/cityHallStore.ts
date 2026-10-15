import { create } from "zustand";

import { User } from "@frontend-types/user.type";

type CityHallState = {
  cityHall: User | null;
  userList: User[];
  setCityHall: (cityHall: User | null) => void;
  setUserList: (userList: User[]) => void;
};

export const useCityHallStore = create<CityHallState>((set) => ({
  cityHall: null,
  userList: [],

  setCityHall: (cityHall: User | null) =>
    set({
      cityHall: cityHall,
    }),

  setUserList: (users: User[]) =>
    set({
      userList: users,
    }),
}));
