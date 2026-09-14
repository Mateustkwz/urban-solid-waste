import { UserRole } from "@constants/common";

import { Address } from "./common.type";

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
  address?: Address[];
  password: string;
  points?: number;
  currentRole?: UserRole;
  rewards?: UserRewards[];
}

export { User };
