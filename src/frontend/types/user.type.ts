import { UserRole } from "@constants/common";

type User = {
  id: string;
  role: UserRole[];
  name: string;
  cpfOrCnpj: string;
  address: string;
  email: string;
  password: string;
  points?: number;
  currentRole?: UserRole;
};

export { User };
