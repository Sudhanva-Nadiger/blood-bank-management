import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Table, Tooltip, Typography, message } from 'antd'

import { getDateFormat } from '../../../utils/helper'
import { SetLoading } from '../../../redux/loaderSlice'
import { GetAllOrganizationsOfDonar, GetAllOrganizationsOfHospital } from '../../../apicalls/users'
import InventoryTable from '../../../components/InventoryTable'
const Organization = ({userType}) => {
    const [showHistory, setShowHistory] = useState(false)
    const [data, setData] = useState([])
    const [selectedOrganization, setSelectedOrganization] = useState({})
    const {currentUser} = useSelector(state => state.users)
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
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => <span className='underline text-md cursor-pointer' onClick={() => {
                setSelectedOrganization(record)
                setShowHistory(true)
            }}>
                History
            </span>
        }
    ]

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div>
            <Table dataSource={data} columns={columns} />
            <Modal
                title={`${userType === 'donar' ? 'Donation History' : 'Blood Request History'} with ${selectedOrganization.organizationName}`}
                centered={true}
                open={showHistory}
                onCancel={() => setShowHistory(false)}
                onOk={() => setShowHistory(false)}
            >
                <InventoryTable filters={{
                    organization: selectedOrganization._id,
                    [userType]: currentUser._id
                }} />
            </Modal>
        </div>
    )
}

export default Organization