import { AddressModel } from "./common.model";

export interface CollectionPoint {
  id: string;
  name: string;
  address: AddressModel;
  phone: string;
  opening_hours: string;
}
