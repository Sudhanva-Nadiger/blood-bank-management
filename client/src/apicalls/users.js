import { axiosInstance } from '.';

export const LoginUser = async (payload) => {
    return await axiosInstance('post', '/api/users/login', payload)
}

export const RegisterUser = async (payload) => {
    return await axiosInstance('post', '/api/users/register', payload)
}

export const GetCurrentUser = async () => {
    return await axiosInstance('get', '/api/users/get-current-user')
}

export const GetAllDonarsOfOrganization = async () => {
    return await axiosInstance('GET', '/api/users/get-all-donars');
}

export const GetAllHospitalOfOrganization = async () => {
    return await axiosInstance('GET', '/api/users/get-all-hospitals');
}
