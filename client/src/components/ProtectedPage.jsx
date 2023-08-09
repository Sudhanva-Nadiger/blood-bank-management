import React, { useEffect } from 'react'
import { message } from 'antd'
import { GetCurrentUser } from '../apicalls/users'

const ProtectedPage = ({ children }) => {
    
    const getCurrentUser = () => {
        try {
            const response = GetCurrentUser()
            if(response.success) {
                message.success(response.message)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <div>{children}</div>
    )
}

export default ProtectedPage