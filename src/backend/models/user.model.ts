import { UserRole } from "@constants/common";

interface UserRewards {
  reward_id: string;
  rescued: boolean;
  rescued_date: string;
  rescued_time: string;
}

interface Adress {
  street: string;
  number: number;
  zip_code: number;
  complement: string;
  city: string;
  state: string;
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
  address?: Adress;
}

export { Adress, UserModel };

