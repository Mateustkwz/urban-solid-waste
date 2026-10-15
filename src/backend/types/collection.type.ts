import { Address } from "./common.type";

export interface CollectionPoint {
  id: string;
  name: string;
  address: Address;
  phone: string;
  openingHours: string;
}

export interface CollectionSchedule {
  neighborhood: string;
  weekDay: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  startTime: string; // Format: "HH:mm"
  endTime: string; // Format: "HH:mm"
}
