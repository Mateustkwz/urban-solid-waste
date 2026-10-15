import deliveryService from "@backend-services/delivery.service";
import { DeliveryType } from "@frontend-types/delivery.type";

const loadUserDeliveries = async (userId: string) => {
  return deliveryService.getUserDeliveries(userId);
};

const loadAssociationDeliveries = async (associationId: string) => {
  return deliveryService.getAssociationDeliveries(associationId);
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

const updateDeliveryStatus = async (
  deliveryId: string,
  status: "pending" | "collected" | "cancelled" | "confirmed",
  associationId: string,
  userId: string,
) => {
  return deliveryService.updateDeliveryStatusById(
    deliveryId,
    status,
    associationId,
    userId,
  );
};

const cancelDelivery = async (deliveryId: string, userId: string) => {
  return deliveryService.cancelDelivery(deliveryId, "cancelled", userId);
};

const deleteDelivery = async (deliveryId: string) => {
  return deliveryService.deleteDelivery(deliveryId);
};

export {
  cancelDelivery, createNewDelivery, deleteDelivery,
  loadAssociationDeliveries,
  loadUserDeliveries,
  updateDelivery,
  updateDeliveryStatus
};

