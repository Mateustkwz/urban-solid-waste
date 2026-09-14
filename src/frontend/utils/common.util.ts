import Toast from "react-native-toast-message";

import { AddressType } from "@constants/common";
import { MappedError } from "@constants/errors";

const showToast = (
  type: "error" | "success" | "info",
  title: string,
  message: string,
) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    topOffset: 60,
  });
};

const handleErrorMessage = (error: unknown) => {
  const customError = error as MappedError;

  const message = JSON.parse(customError.message) as MappedError;

  return message.message;
};

const getAddressType = (userRole?: string): AddressType => {
  switch (userRole) {
    case "CITIZEN":
      return "RESIDENTIAL";
    case "ASSOCIATION":
      return "COLLECTION_POINT";
    default:
      return "CITY_HALL";
  }
};

export { getAddressType, handleErrorMessage, showToast };
