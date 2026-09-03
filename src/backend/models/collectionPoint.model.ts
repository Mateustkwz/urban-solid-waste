import { Adress } from "./user.model";

export interface CollectionPoint {
  id: string;
  name: string;
  address: Adress;
  phone: string;
  opening_hours: string;
}
