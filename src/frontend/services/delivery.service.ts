import deliveryService from "@backend-services/delivery.service";
import { DeliveryType } from "@frontend-types/delivery.type";

const loadUserDeliveries = async (userId: string) => {
  return deliveryService.getUserDeliveries(userId);
};

const createNewDelivery = async (
  delivery: DeliveryType,
  associationId?: string,
) => {
  return deliveryService.createNewDelivery(delivery, associationId);
};

const updateDelivery = async (delivery: DeliveryType) => {
  return deliveryService.updateDeliveryById(
    delivery.id,
    delivery.material,
    delivery.method,
    delivery.unit,
    delivery.quantity,
    delivery.userId,
    delivery.address,
  );
};

const deleteDelivery = async (deliveryId: string) => {
  return deliveryService.deleteDelivery(deliveryId);
};

export {
  createNewDelivery,
  deleteDelivery,
  loadUserDeliveries,
  updateDelivery
};

