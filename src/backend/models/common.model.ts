import { AddressType } from "@constants/common";

interface AddressModel {
  id: string;
  name: string;
  type: AddressType;
  street: string;
  number: number;
  zip_code: number;
  complement: string;
  city: string;
  state: string;
}

export { AddressModel };
