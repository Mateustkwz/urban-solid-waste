enum UserRole {
  CITIZEN = "CITIZEN",
  ASSOCIATION = "ASSOCIATION",
  CITY_HALL = "CITY_HALL",
}

type User = {
  id: string;
  role: UserRole;
  name: string;
  cpfOrCnpj: string;
  address: string;
  email: string;
  password: string;
  points?: number;
};

export { User, UserRole };
