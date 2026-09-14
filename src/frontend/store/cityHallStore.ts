import { create } from "zustand";

import { User } from "@frontend-types/user.type";

type CityHallState = {
  cityHall: User | null;
  setCityHall: (cityHall: User) => void;
};

export const useCityHallStore = create<CityHallState>((set) => ({
  cityHall: null,

  setCityHall: (cityHall: User) =>
    set({
      cityHall: cityHall,
    }),
}));
