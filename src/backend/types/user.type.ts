import { UserRole } from "@constants/common";

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
}

export { User };
