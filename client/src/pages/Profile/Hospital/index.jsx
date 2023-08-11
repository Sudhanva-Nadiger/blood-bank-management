import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Table, Tooltip, Typography, message } from 'antd'

import { getDateFormat } from '../../../utils/helper'
import { SetLoading } from '../../../redux/loaderSlice'
import { GetAllHospitalOfOrganization } from '../../../apicalls/users'

const Hospital = () => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    const getData = useCallback(async () => {
        try {
            dispatch(SetLoading(true))
            const response = await GetAllHospitalOfOrganization()
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

    const columns = [
        {
            title: 'Hospital Name',
            dataIndex: 'hospitalName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text) => <Tooltip title={text}>
                <Typography.Text ellipsis={true} className='w-9 sm:w-12 md:w-full'>{text}</Typography.Text>
            </Tooltip>
        },
        {
            title: 'Phone',
            dataIndex: 'phone'
        },
        {
            title: 'Owner Name',
            dataIndex: 'owner'
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (text) => getDateFormat(text)
        },
    ]

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div>
            <Table dataSource={data} columns={columns} />
        </div>
    )
}

export default Hospital