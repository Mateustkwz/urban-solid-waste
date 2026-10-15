import { AddressType } from "@constants/common";

interface Address {
  id: string;
  name: string;
  type: AddressType;
  street: string;
  number: number;
  zipCode: number;
  city: string;
  state: string;
  complement?: string;
}

export { Address };
