import { DeliveryModel } from "@models/delivery.model";

interface DeliverySchema {
  "@delivery": {
    [key: string]: DeliveryModel;
  };
}

export { DeliverySchema };
