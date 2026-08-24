import { UserRole } from "@constants/common";

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
  address: string;
  email: string;
  password: string;
  points: number;
  rewards?: UserRewards[];
}

export { UserModel };
