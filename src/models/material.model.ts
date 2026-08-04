export interface Material {
  id: string;
  name: string;
  category: "paper" | "plastic" | "glass" | "metal" | "organic" | "electronic";
  description: string;
  preparation_instructions: string;
  accepted: boolean;
  icon: string;
}
