import { axiosInstance } from '.';

export const AddInventory = async (inventory) => {
    return await axiosInstance('POST', '/api/inventory/add', inventory);
}

export const GetInventory = async () => {
   return await axiosInstance('GET', '/api/inventory/get');
}
