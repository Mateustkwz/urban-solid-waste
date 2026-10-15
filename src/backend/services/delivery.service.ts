import * as Crypto from "expo-crypto";

import { Address } from "@backend-types/common.type";
import { Delivery } from "@backend-types/delivery.type";
import {
  toDeliveryData,
  toDeliveryModel,
} from "@backend-utils/deliveryData.util";
import { convertAddressDataToModel } from "@backend-utils/userData.util";
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

import userService from "./user.service";

const getAssociationDeliveries = async (
  associationId: string,
): Promise<Delivery[]> => {
  const deliveries = await getDelivery();

  if (!deliveries) {
    return [];
  }

  const associationDeliveries = Object.values(deliveries)
    .filter((delivery) => delivery.association_id === associationId)
    .map((filtered) => toDeliveryData(filtered));

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
        return toDeliveryData(delivery);
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

  return toDeliveryData(delivery);
};

const updateDeliveryById = async (
  deliveryId: string,
  material?: string[],
  method?: "association" | "home",
  unit?: "kg" | "unit",
  quantity?: number,
  userId?: string,
  address?: Address,
): Promise<Delivery[]> => {
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

  // Update the delivery address
  if (address) {
    delivery.address = convertAddressDataToModel([address])[0];
  }

  delivery.updated_at = new Date().toISOString();

  const updatedDeliveries = await updateDelivery(delivery);

  return Object.values(updatedDeliveries)
    .filter((item) => item.user_id === userId)
    .map((rawDelivery) => toDeliveryData(rawDelivery));
};

const updateDeliveryStatusById = async (
  deliveryId: string,
  status: "confirmed" | "collected" | "delivery" | "pending" | "cancelled",
  associationId: string,
  userId: string,
): Promise<Delivery[]> => {
  const deliveries = await getDelivery();
  const user = await userService.getUserById(userId);

  if (!user) {
    throw new Error(createNotFoundError(errorMessages.userNotFound));
  }

  if (!deliveries) {
    throw new Error(createNotFoundError(errorMessages.deliveryNotFound));
  }

  const delivery = Object.values(deliveries).find((d) => d.id === deliveryId);

  if (!delivery) {
    throw new Error(createNotFoundError(errorMessages.deliveryNotFound));
  }

  if (delivery.association_id !== associationId) {
    throw new Error(createBadRequestError(errorMessages.permissionDenied));
  }

  if (delivery.user_id !== userId) {
    throw new Error(createBadRequestError(errorMessages.permissionDenied));
  }

  // Update the delivery status
  delivery.status = status;
  delivery.updated_at = new Date().toISOString();
  delivery.updated_by = (associationId ? associationId : userId) as string;

  const coef = 1 / delivery.quantity;
  const points = (coef * delivery.quantity * 10) / 2;

  if (status === "collected") {
    await userService.updateUserPoints(userId, points);
  }

  const updatedDeliveries = await updateDelivery({ ...delivery, points });

  return Object.values(updatedDeliveries)
    .filter((item) => item.association_id === associationId)
    .map((rawDelivery) => toDeliveryData(rawDelivery));
};

const cancelDelivery = async (
  deliveryId: string,
  status: "cancelled",
  userId: string,
) => {
  const deliveries = await getDelivery();
  const user = await userService.getUserById(userId);

  if (!user) {
    throw new Error(createNotFoundError(errorMessages.userNotFound));
  }

  if (!deliveries) {
    throw new Error(createNotFoundError(errorMessages.deliveryNotFound));
  }

  const delivery = Object.values(deliveries).find((d) => d.id === deliveryId);

  if (!delivery) {
    throw new Error(createNotFoundError(errorMessages.deliveryNotFound));
  }

  if (delivery.user_id !== userId) {
    throw new Error(createBadRequestError(errorMessages.permissionDenied));
  }

  delivery.status = status;
  delivery.updated_at = new Date().toISOString();
  delivery.updated_by = userId;

  const updatedDeliveries = await updateDelivery({ ...delivery });

  return Object.values(updatedDeliveries)
    .filter((item) => item.user_id === userId)
    .map((rawDelivery) => toDeliveryData(rawDelivery));
};

const createNewDelivery = async (
  delivery: Delivery,
  associationId?: string,
): Promise<Delivery[]> => {
  const newDelivery = {
    ...delivery,
    association_id: associationId,
    id: Crypto.randomUUID(),
  };

  const updatedDeliveries = await createDelivery(
    toDeliveryModel(
      newDelivery,
      associationId ? associationId : delivery.userId,
    ),
  );

  return Object.values(updatedDeliveries)
    .filter((item) => item.user_id === delivery.userId)
    .map((rawDelivery) => toDeliveryData(rawDelivery));
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
  cancelDelivery,
  createNewDelivery,
  deleteDelivery,
  getAssociationDeliveries,
  getDeliveryById,
  getUserDeliveries,
  updateDeliveryById,
  updateDeliveryStatusById,
};
