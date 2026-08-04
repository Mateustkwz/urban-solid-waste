export interface User {
  id: string;
  role: "citizen" | "association" | "cityHall";
  name: string;
  cpf_or_cnpj: string;
  address: string;
  email: string;
  password: string;
  points: number;
}
