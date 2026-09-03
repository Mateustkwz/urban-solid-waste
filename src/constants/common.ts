import * as LucideIcons from "lucide-react-native";

import { Colors } from "@theme/index";

type MaterialType = {
  [key: string]: {
    label: string;
    icon: keyof typeof LucideIcons;
    color: keyof typeof Colors.light;
    backgroundColor: keyof typeof Colors.light;
  };
};

const textRoles = {
  CITIZEN: "População",
  ASSOCIATION: "Associação de Catadores",
  CITY_HALL: "Prefeitura",
};

const materials: MaterialType = {
  paper: {
    label: "Papel",
    color: "associationIcon",
    backgroundColor: "associationBackground",
    icon: "Newspaper",
  },
  plastic: {
    label: "Plástico",
    color: "red",
    backgroundColor: "redBackground",
    icon: "Box",
  },
  glass: {
    label: "Vidro",
    color: "citizenIcon",
    backgroundColor: "citizenBackground",
    icon: "BottleWine",
  },
  metal: {
    label: "Metal",
    color: "yellow",
    backgroundColor: "yellowBackground",
    icon: "Magnet",
  },
  organic: {
    label: "Orgânico",
    color: "brown",
    backgroundColor: "brownBackground",
    icon: "Drumstick",
  },
  eletronic: {
    label: "Eletrônico",
    color: "orange",
    backgroundColor: "orangeBackground",
    icon: "CircuitBoard",
  },
};

const weekdays = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

enum UserRole {
  CITIZEN = "CITIZEN",
  ASSOCIATION = "ASSOCIATION",
  CITY_HALL = "CITY_HALL",
}

export { materials, months, textRoles, UserRole, weekdays };
