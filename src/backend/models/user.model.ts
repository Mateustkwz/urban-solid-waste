import { UserRole } from "@constants/common";
import { AddressModel } from "./common.model";

interface UserRewards {
  reward_id: string;
  rescued: boolean;
  rescued_date: string;
  rescued_time: string;
}

interface UserModel {
  id: string;
  role: UserRole[];
  name: string;
  cpf_or_cnpj: string;
  email: string;
  password: string;
  points: number;
  rewards?: UserRewards[];
  address?: AddressModel[];
}

export { UserModel };
