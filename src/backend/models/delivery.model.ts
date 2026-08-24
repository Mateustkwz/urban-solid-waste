interface DeliveryDate {
  date: string;
  time: string;
}

export interface Delivery {
  id: string;
  userId: string;
  material: string;
  quantity: number;
  unit: "kg" | "unit";
  delivery_method: "association" | "home";
  status: "Pending" | "Collected" | "Confirmed";
  delivery_date?: DeliveryDate;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}
