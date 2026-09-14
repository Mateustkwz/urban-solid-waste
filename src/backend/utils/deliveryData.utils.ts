import { Delivery } from "@backend-types/delivery.type";
import { DeliveryModel } from "@models/delivery.model";
import { DeliverySchema } from "@storage/delivery.storage";

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

export const transformDeliveryData = (delivery: DeliveryModel): Delivery => {
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
    createdAt: delivery.created_at,
    updatedAt: delivery.updated_at,
    updatedBy: delivery.updated_by,
    points: delivery.points,
  };
};

export const transformDeliveryDataToModel = (
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
    created_at: delivery.createdAt,
    created_by: createdBy,
    updated_at: delivery.updatedAt,
    updated_by: delivery.updatedBy,
    points: delivery.points,
  };
};
