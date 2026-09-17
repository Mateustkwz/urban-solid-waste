import { UserRole } from "@constants/common";
import { AddressModel } from "./common.model";
import { RewardModel } from "./reward.model";

interface UserModel {
  id: string;
  role: UserRole[];
  name: string;
  cpf_or_cnpj: string;
  email: string;
  password: string;
  points: number;
  rewards?: RewardModel[];
  address?: AddressModel[];
}

export { UserModel };
