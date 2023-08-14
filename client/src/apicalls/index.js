import axios from 'axios';
const BASE_URL = 'http://localhost:5000' ;
  

export const axiosInstance = async (
    method, endpoint, payload
) => {
    try {
        const response = await axios(
            {
                method,
                url: `${endpoint}`,
                data: payload,
                headers: {
                    authorization: `${localStorage.getItem('token')}`
                }
            },
        )

        return response.data
    } catch (error) {
        return error
    }
}