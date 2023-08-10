import { axiosInstance } from '.';

export const AddInventory = async (inventory) => {
    try {
        const res = await axiosInstance('POST', '/api/inventory/add', inventory);
        return res;
    } catch (error) {
        console.log(error);
    }
}