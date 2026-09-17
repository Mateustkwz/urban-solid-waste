import { UserRole } from "@constants/common";

import { Address } from "./common.type";
import { Reward } from "./reward.type";
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
  rewards?: Reward[];
}

export { User };
