import { useCallback, useEffect, useState } from 'react'
import { Button, Table, message } from 'antd'

import InventoryForm from './InventoryForm'
import { useDispatch } from 'react-redux'
import { SetLoading } from '../../../redux/loaderSlice'
import { GetInventory } from '../../../apicalls/inventory'
import { getDateFormat } from '../../../utils/helper'

const Inventory = () => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    const colums = [
        {
            title: 'Inventory TYpe',
            dataIndex: 'inventoryType',
            render: (text) => text.toUpperCase()
        },
        {
            title: 'Blood Group',
            dataIndex: 'bloodGroup',
            render: (text) => text.toUpperCase()
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (text) => text + 'ML'
        },
        {
            title: 'Reference',
            dataIndex: 'reference',
            render: (text, record) => {
                if(record.inventoryType === 'in') {
                    return record.donor.name
                } else {
                    return record.hospital.name
                }
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => getDateFormat(text)
        }
    ]

    const getData = useCallback(async () => {
        try {
            dispatch(SetLoading(true))
            const response = await GetInventory()
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
        <div>
            <div className="flex justify-end">
                <Button type="default" onClick={() => setOpen(true)}>Add Inventory</Button>
            </div>

            <Table columns={colums} dataSource={data} className='mt-3 border border-black'/>

            <InventoryForm	open={open} setOpen={setOpen} />
        </div>
    )
}

export default Inventory