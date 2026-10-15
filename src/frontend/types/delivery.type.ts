import { Address } from "./common.type";

type DeliveryDate = {
  date: string;
  startTime: string;
  endTime: string;
};

export type DeliveryType = {
  id: string;
  userId: string;
  associationId: string;
  material: string[];
  quantity: number;
  unit: "kg" | "unit";
  method: "association" | "home";
  status: "confirmed" | "collected" | "delivery" | "pending" | "cancelled";
  deliveryDate: DeliveryDate;
  address: Address;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  points?: number;
};
