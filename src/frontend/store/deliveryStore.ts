import { create } from "zustand";

import { DeliveryType } from "@frontend-types/delivery.type";

type DeliveryState = {
  deliveries: DeliveryType[];
  setDeliveries: (deliveries: DeliveryType[]) => void;
};

export const useDeliveryStore = create<DeliveryState>((set) => ({
  deliveries: [],

  setDeliveries: (deliveries: DeliveryType[]) =>
    set({
      deliveries: deliveries,
    }),
}));
