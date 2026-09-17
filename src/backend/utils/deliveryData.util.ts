import { Delivery } from "@backend-types/delivery.type";
import { DeliveryModel } from "@models/delivery.model";
import { DeliverySchema } from "@storage/delivery.storage";
import {
  convertAddressDataToModel,
  convertAddressModelToData,
} from "./userData.util";

export const searchDeliveriesByUserId = (
  deliveryData: string,
  userId: string,
) => {
  const deliveries = JSON.parse(deliveryData) as DeliverySchema;

  const delivery = Object.entries(deliveries["@delivery"]).find(
    (item) => item[1].id === userId,
  );

  return delivery ? { ...delivery[1] } : null;
};

export const toDeliveryData = (delivery: DeliveryModel): Delivery => {
  return {
    id: delivery.id,
    userId: delivery.user_id,
    associationId: delivery.association_id,
    material: delivery.material,
    quantity: delivery.quantity,
    unit: delivery.unit,
    method: delivery.method,
    status: delivery.status,
    deliveryDate: {
      date: delivery.delivery_date.date,
      startTime: delivery.delivery_date.start_time,
      endTime: delivery.delivery_date.end_time,
    },
    address: convertAddressModelToData([delivery.address])[0],
    createdBy: delivery.created_by,
    createdAt: delivery.created_at,
    updatedAt: delivery.updated_at,
    updatedBy: delivery.updated_by,
    points: delivery.points,
  };
};

export const toDeliveryModel = (
  delivery: Delivery,
  createdBy: string,
): DeliveryModel => {
  return {
    id: delivery.id,
    user_id: delivery.userId,
    association_id: delivery.associationId,
    material: delivery.material,
    quantity: delivery.quantity,
    unit: delivery.unit,
    method: delivery.method,
    status: delivery.status,
    delivery_date: {
      date: delivery.deliveryDate.date,
      start_time: delivery.deliveryDate.startTime,
      end_time: delivery.deliveryDate.endTime,
    },
    address: convertAddressDataToModel([delivery.address])[0],
    created_at: delivery.createdAt,
    created_by: createdBy,
    updated_at: delivery.updatedAt,
    updated_by: delivery.updatedBy,
    points: delivery.points,
  };
};
