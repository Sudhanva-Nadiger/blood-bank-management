import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SetLoading } from '../../../redux/loaderSlice'
import { GetAllDonarsOfOrganization } from '../../../apicalls/users'
import { message } from 'antd'

const Donars = () => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    const getData = useCallback(async () => {
        try {
            dispatch(SetLoading(true))
            const response = await GetAllDonarsOfOrganization()
            console.log('donars of org', response);
            dispatch(SetLoading(false))
            if(response.success) {
                setData(response.data)
                dispatch(SetLoading(false))
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(SetLoading(false))
            message.error(error.message)
        }
    },[dispatch])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div>{JSON.stringify(data)}</div>
    )
}

export default Donars