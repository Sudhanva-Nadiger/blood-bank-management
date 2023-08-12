import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Table, Tooltip, Typography, message } from 'antd'

import { getDateFormat } from '../../../utils/helper'
import { SetLoading } from '../../../redux/loaderSlice'
import { GetAllOrganizationsOfDonar, GetAllOrganizationsOfHospital } from '../../../apicalls/users'

const Organization = ({userType}) => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    const getData = useCallback(async () => {
        try {
            dispatch(SetLoading(true))
            const response = await (userType === 'donar' ? GetAllOrganizationsOfDonar() : GetAllOrganizationsOfHospital());
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
    },[dispatch, userType])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'organizationName',
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

export default Organization