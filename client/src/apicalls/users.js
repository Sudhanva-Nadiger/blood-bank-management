import { axiosInstance } from '.';

export const LoginUser = async (payload) => {
    return await axiosInstance('post', '/api/users/login', payload)
}

export const RegisterUser = async (payload) => {
    return await axiosInstance('post', '/api/users/register', payload)
}