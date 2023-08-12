import { axiosInstance } from '.';

export const GetAllBloodGroupsInventory = async () => {
    return await axiosInstance('GET','/api/dashboard/blood-groups-data');
}