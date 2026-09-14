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

const materialUnit = {
  kg: "Kg",
  unit: "Unidade",
};

const aboutText =
  "Este Aplicativo é o fruto do Trabalho de Conclusão Curso do aluno Hilário José Pereira Neto, estudante da UTFPR - Universidade Tecnológica Federal do Paraná, para obtenção do titulo de Baracharel em Engenharia Eletronica. A ideia surgiu da motivação em propor uma solução que unisse os conhecimentos de tecnologia da informação com Logistica Reversa para melhorar os indices de reciclagem das cidades e promover uma melhor consciencia ambiental para a população";

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

type AddressType = "RESIDENTIAL" | "COLLECTION_POINT" | "CITY_HALL";

enum UserRole {
  CITIZEN = "CITIZEN",
  ASSOCIATION = "ASSOCIATION",
  CITY_HALL = "CITY_HALL",
}

export {
  aboutText, AddressType,
  materials,
  materialUnit,
  months,
  textRoles,
  UserRole,
  weekdays
};

