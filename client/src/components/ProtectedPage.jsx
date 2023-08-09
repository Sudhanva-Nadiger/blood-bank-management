import React, { useCallback, useEffect, useState } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { GetCurrentUser } from '../apicalls/users'
import { getLoggedInUsername } from '../utils/helper'
import { SetCurrentUser } from '../redux/usersSlice'
import { SetLoading } from '../redux/loaderSlice'

const ProtectedPage = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {currentUser} = useSelector(state => state.users) 

    const getCurrentUser = useCallback(async () => {
        try {
            dispatch(SetLoading(true))
            const response = await GetCurrentUser()
            dispatch(SetLoading(false))
            console.log(response);
            if(response.success) {
                message.success(response.message)
                dispatch(SetCurrentUser(response.data))
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(SetLoading(false))
            message.error(error.message)
        }
    }, [dispatch])
    

    useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            getCurrentUser()
        } else {
            navigate('/login')
        }
    }, [getCurrentUser, navigate])

    return (
        currentUser ? <div>
            <h1>{getLoggedInUsername(currentUser)}</h1>
            {children}
        </div> :  <></>
    )
}

export default ProtectedPage