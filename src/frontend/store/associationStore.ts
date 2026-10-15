import { create } from "zustand";

import { User } from "@frontend-types/user.type";

type AssociationState = {
  associations: User[];
  setAssociations: (associations: User[]) => void;
};

export const useAssociationStore = create<AssociationState>((set) => ({
  associations: [],

  setAssociations: (associations: User[]) =>
    set({
      associations: associations,
    }),
}));
