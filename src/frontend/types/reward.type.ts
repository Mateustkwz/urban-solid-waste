export interface Reward {
  id: string;
  img: string;
  title: string;
  description: string;
  requiredPoints: number;
  available: boolean;
  used?: boolean;
}
