export interface Delivery {
  id: string;
  userId: string;
  material: string;
  quantity: number;
  unit: "kg" | "unit";
  delivery_method: "association" | "home";
  status: "Pending" | "Collected" | "Confirmed";
  created_at: string;
}
