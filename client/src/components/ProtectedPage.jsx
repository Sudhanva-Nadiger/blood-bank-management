import React, { useCallback, useEffect, useState } from 'react'
import { Tooltip, message } from 'antd'
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

    const { currentUser } = useSelector(state => state.users)

    const getCurrentUser = useCallback(async () => {
        try {
            dispatch(SetLoading(true))
            const response = await GetCurrentUser()
            dispatch(SetLoading(false))
            console.log(response);
            if (response.success) {
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
        if (localStorage.getItem('token') !== null) {
            getCurrentUser()
        } else {
            navigate('/login')
        }
    }, [getCurrentUser, navigate])

    return (
        currentUser ? <div>
            {/* header */}
            <div className='flex justify-between items-center bg-primary text-white px-5 py-3'>
                <div className="flex flex-col uppercase">
                    <h1 className="text-2xl uppercase">
                        Blood Bank
                    </h1>
                    <span className='text-xs'>
                        {currentUser?.userType.toUpperCase()}
                    </span>
                </div>
                <div className='flex items-center'>
                    <i className='ri-shield-user-fill'></i>
                    <span className='mr-5 ml-1 text-xl cursor-pointer'
                        onClick={() => navigate('/profile')}
                    >
                        {getLoggedInUsername(currentUser)}
                    </span>

                    <Tooltip title='logout' className='ml-5 cursor-pointer'>
                        <i className='ri-logout-circle-r-line' onClick={() => {
                            localStorage.removeItem('token')
                            navigate('/login')
                        }}></i>
                    </Tooltip>
                </div>
            </div>

            {/* content */}
            <div className="px-5 py-1">
                {children}
            </div>
        </div> : <div>oops</div>
    )
}

export default ProtectedPage