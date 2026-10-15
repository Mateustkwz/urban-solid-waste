export interface RewardModel {
  id: string;
  img: string;
  title: string;
  description: string;
  required_points: number;
  available: boolean;
  used?: boolean;
}
