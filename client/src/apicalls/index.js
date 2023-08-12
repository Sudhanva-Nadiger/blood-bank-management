import axios from 'axios';
const BASE_URL = 'http://localhost:5000' ;
  

export const axiosInstance = async (
    method, endpoint, payload
) => {
    try {
        console.log('payload filter', payload);
        const response = await axios(
            {
                method,
                url: `${BASE_URL}${endpoint}`,
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