import { useCallback, useEffect, useState } from 'react'
import { Table, message } from 'antd'

import { useDispatch } from 'react-redux'
import { SetLoading } from '../redux/loaderSlice'
import { getDateFormat } from '../utils/helper'
import { GetInventoryWithFilters } from '../apicalls/inventory'

const InventoryTable = () => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  const colums = [
    {
      title: 'Organization',
      dataIndex: 'organization',
      render: (text) => text.organizationName
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
      title: 'Date',
      dataIndex: 'createdAt',
      render: (text) => getDateFormat(text)
    }
  ]

  const getData = useCallback(async () => {
    try {
      dispatch(SetLoading(true))
      const response = await GetInventoryWithFilters()
      console.log(response);
      dispatch(SetLoading(false))
      if (response.success) {
        setData(response.data)
        dispatch(SetLoading(false))
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(SetLoading(false))
      message.error(error.message)
    }
  }, [dispatch])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div>
      <Table columns={colums} dataSource={data} className='mt-3'/>
    </div>
  )
}

export default InventoryTable