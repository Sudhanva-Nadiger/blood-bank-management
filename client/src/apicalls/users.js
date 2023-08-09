import { axiosInstance } from '.';

export const LoginUser = async (payload) => {
    return await axiosInstance('post', '/api/users/login', payload)
}

export const RegisterUser = async (payload) => {
    return await axiosInstance('post', '/api/users/register', payload)
}

export const GetCurrentUser = async () => {
    const response = await axiosInstance('get', '/api/users/get-current-user')
}