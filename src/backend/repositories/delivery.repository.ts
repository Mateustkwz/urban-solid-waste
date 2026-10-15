import { delay } from "@backend-utils/common.util";
import { DeliveryModel } from "@models/delivery.model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeliverySchema } from "@storage/delivery.storage";

const createDelivery = async (delivery: DeliveryModel) => {
  const data = await AsyncStorage.getItem("@delivery");

  const deliveries: DeliverySchema = data
    ? JSON.parse(data)
    : { "@delivery": {} };

  deliveries["@delivery"][delivery.id] = delivery;

  await AsyncStorage.setItem(`@delivery`, JSON.stringify(deliveries));
  await delay();

  return deliveries["@delivery"];
};

const updateDelivery = async (delivery: DeliveryModel) => {
  const data = await AsyncStorage.getItem("@delivery");

  const deliveries: DeliverySchema = data
    ? JSON.parse(data)
    : { "@delivery": {} };

  deliveries["@delivery"][delivery.id] = delivery;

  await AsyncStorage.setItem("@delivery", JSON.stringify(deliveries));

  await delay();

  return deliveries["@delivery"];
};

const getDelivery = async () => {
  const data = await AsyncStorage.getItem("@delivery");

  if (!data) {
    return null;
  }

  const deliveries: DeliverySchema = JSON.parse(data);
  await delay();

  return deliveries["@delivery"];
};

const deleteDeliveryById = async (deliveryId: string) => {
  const data = await AsyncStorage.getItem("@delivery");

  if (!data) {
    return;
  }

  const deliveries: DeliverySchema = JSON.parse(data);

  delete deliveries["@delivery"][deliveryId];
  await delay();

  await AsyncStorage.setItem("@delivery", JSON.stringify(deliveries));
};

export { createDelivery, deleteDeliveryById, getDelivery, updateDelivery };
