import { RewardModel } from "@models/reward.model";

interface RewardSchema {
  "@reward": {
    [key: string]: RewardModel;
  };
}

export { RewardSchema };
