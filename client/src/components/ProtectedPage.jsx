import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { GetCurrentUser } from '../apicalls/users'
import { getLoggedInUsername } from '../utils/helper'

const ProtectedPage = ({ children }) => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(null)

    const getCurrentUser = async () => {
        try {
            const response = await GetCurrentUser()
            console.log(response);
            if(response.success) {
                message.success(response.message)
                setCurrentUser(response.data)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            getCurrentUser()
        } else {
            navigate('/login')
        }
    }, [navigate])

    return (
        currentUser && <div>
            <h1>{getLoggedInUsername(currentUser)}</h1>
            {children}
        </div>
    )
}

export default ProtectedPage