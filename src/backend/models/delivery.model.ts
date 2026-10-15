import { AddressModel } from "./common.model";

interface DeliveryDate {
  date: string;
  start_time: string;
  end_time: string;
}

export interface DeliveryModel {
  id: string;
  user_id: string;
  association_id: string;
  material: string[];
  quantity: number;
  unit: "kg" | "unit";
  method: "association" | "home";
  status: "confirmed" | "collected" | "delivery" | "pending" | "cancelled";
  delivery_date: DeliveryDate;
  address: AddressModel;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  points?: number;
}
