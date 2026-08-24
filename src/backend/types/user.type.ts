import { UserRole } from "@constants/common";

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
  address: string;
  email: string;
  password: string;
  points?: number;
  currentRole?: UserRole;
  rewards?: UserRewards[];
}

export { User };
