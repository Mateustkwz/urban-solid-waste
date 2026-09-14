import { Delivery } from "@backend-types/delivery.type";
import {
  transformDeliveryData,
  transformDeliveryDataToModel,
} from "@backend-utils/deliveryData.utils";
import {
  createBadRequestError,
  createNotFoundError,
  errorMessages,
} from "@constants/errors";
import {
  createDelivery,
  deleteDeliveryById,
  getDelivery,
  updateDelivery,
} from "@repositories/delivery.repository";

const getAssociationDeliveries = async (
  associationId: string,
): Promise<Delivery[]> => {
  const deliveries = await getDelivery();

  if (!deliveries) {
    return [];
  }

  const associationDeliveries = Object.values(deliveries)
    .map((delivery) => {
      if (delivery.association_id === associationId) {
        return transformDeliveryData(delivery);
      }

      return null;
    })
    .filter((v): v is Delivery => !!v);

  return associationDeliveries;
};

const getUserDeliveries = async (userId: string): Promise<Delivery[]> => {
  const deliveries = await getDelivery();

  if (!deliveries) {
    return [];
  }

  const userDeliveries = Object.values(deliveries)
    .map((delivery) => {
      if (delivery.user_id === userId) {
        return transformDeliveryData(delivery);
      }

      return null;
    })
    .filter((v): v is Delivery => !!v);

  return userDeliveries;
};

const getDeliveryById = async (
  deliveryId: string,
): Promise<Delivery | null> => {
  const deliveries = await getDelivery();

  if (!deliveries) {
    return null;
  }

  const delivery = Object.values(deliveries).find((d) => d.id === deliveryId);

  if (!delivery) {
    return null;
  }

  return transformDeliveryData(delivery);
};

const updateDeliveryById = async (
  deliveryId: string,
  material?: string[],
  method?: "association" | "home",
  unit?: "kg" | "unit",
  quantity?: number,
  userId?: string,
): Promise<void> => {
  const deliveries = await getDelivery();

  if (!deliveries) {
    throw new Error(createNotFoundError(errorMessages.deliveryNotFound));
  }

  const delivery = Object.values(deliveries).find((d) => d.id === deliveryId);

  if (!delivery) {
    throw new Error(createNotFoundError(errorMessages.deliveryNotFound));
  }

  if (userId && delivery.user_id !== userId) {
    throw new Error(createBadRequestError(errorMessages.permissionDenied));
  }

  // Update the delivery material
  if (material) {
    delivery.material = material;
  }

  // Update the delivery method
  if (method) {
    delivery.method = method;
  }

  // Update the delivery unit
  if (unit) {
    delivery.unit = unit;
  }

  // Update the delivery quantity
  if (quantity) {
    delivery.quantity = quantity;
  }

  delivery.updated_at = new Date().toISOString();

  await updateDelivery(delivery);
};

const updateDeliveryStatusById = async (
  deliveryId: string,
  status: "confirmed" | "collected" | "delivery" | "pending" | "cancelled",
  associationId?: string,
  userId?: string,
): Promise<void> => {
  const deliveries = await getDelivery();

  if (!deliveries) {
    throw new Error(createNotFoundError(errorMessages.deliveryNotFound));
  }

  const delivery = Object.values(deliveries).find((d) => d.id === deliveryId);

  if (!delivery) {
    throw new Error(createNotFoundError(errorMessages.deliveryNotFound));
  }

  if (associationId && delivery.association_id !== associationId) {
    throw new Error(createBadRequestError(errorMessages.permissionDenied));
  }

  if (userId && delivery.user_id !== userId) {
    throw new Error(createBadRequestError(errorMessages.permissionDenied));
  }

  // Update the delivery status
  delivery.status = status;
  delivery.updated_at = new Date().toISOString();
  delivery.updated_by = (associationId ? associationId : userId) as string;

  await updateDelivery(delivery);
};

const createNewDelivery = async (
  delivery: Delivery,
  associationId?: string,
): Promise<void> => {
  const deliveries = await getDelivery();

  if (!deliveries) {
    throw new Error(createNotFoundError(errorMessages.deliveryNotFound));
  }

  const newDelivery = {
    ...delivery,
    association_id: associationId,
  };

  await createDelivery(
    transformDeliveryDataToModel(
      newDelivery,
      associationId ? associationId : delivery.userId,
    ),
  );
};

const deleteDelivery = async (deliveryId: string): Promise<void> => {
  const deliveries = await getDelivery();

  if (!deliveries) {
    throw new Error(createNotFoundError(errorMessages.deliveryNotFound));
  }

  const delivery = Object.values(deliveries).find((d) => d.id === deliveryId);

  if (!delivery) {
    throw new Error(createNotFoundError(errorMessages.deliveryNotFound));
  }

  await deleteDeliveryById(deliveryId);
};

export default {
  createNewDelivery,
  deleteDelivery,
  getAssociationDeliveries,
  getDeliveryById,
  getUserDeliveries,
  updateDeliveryById,
  updateDeliveryStatusById,
};
