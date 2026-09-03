import { UserRole } from "@constants/common";
import { Adress } from "@models/user.model";

interface UserRewards {
  rewardId: string;
  rescued: boolean;
  rescuedDate: string;
  rescuedTime: string;
}

interface User {
  id: string;
  role: UserRole[];
  name: string;
  cpfOrCnpj: string;
  email: string;
  password: string;
  address?: Adress;
  points?: number;
  currentRole?: UserRole;
  rewards?: UserRewards[];
}

export { User };
