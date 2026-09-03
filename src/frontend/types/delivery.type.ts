type DeliveryDate = {
  date: string;
  start_time: string;
  end_time: string;
};

export type DeliveryType = {
  id: string;
  material: string[];
  quantity: number;
  unit: "kg" | "unit";
  method: "association" | "home";
  status: "confirmed" | "collected" | "delivery" | "pending" | "cancelled";
  delivery_date: DeliveryDate;
  points?: number;
};
