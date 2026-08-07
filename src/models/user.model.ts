import { UserRole } from "@app-types/user.type";
interface UserModel {
  id: string;
  role: UserRole;
  name: string;
  cpf_or_cnpj: string;
  address: string;
  email: string;
  password: string;
  points: number;
}

interface UserSchema {
  [key: string]: UserModel;
}

export { UserModel, UserSchema };
