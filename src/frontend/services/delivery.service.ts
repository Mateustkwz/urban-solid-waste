import deliveryService from "@backend-services/delivery.service";

const loadUserDeliveries = async (userId: string) => {
  return deliveryService.getUserDeliveries(userId);
};

export { loadUserDeliveries };
