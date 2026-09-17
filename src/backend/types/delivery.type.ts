import { Address } from "./common.type";

interface DeliveryDate {
  date: string;
  startTime: string;
  endTime: string;
}

export interface Delivery {
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
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  points?: number;
}
