// axios.service.ts
import axios from "axios";

const getAddressByZipCode = async (zipcode: string) => {
  return axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);
};

export { getAddressByZipCode };
