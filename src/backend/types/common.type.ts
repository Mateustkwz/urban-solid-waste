import { AddressType } from "@constants/common";

interface Address {
  id: string;
  name: string;
  type: AddressType;
  street: string;
  number: number;
  zipCode: number;
  complement?: string;
  city: string;
  state: string;
}

export { Address };
