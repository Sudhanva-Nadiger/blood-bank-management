import { Form, Input, Modal, Radio, Select, message } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAntdInputValidation } from '../../../utils/helper'
import { SetLoading } from '../../../redux/loaderSlice'
import { AddInventory } from '../../../apicalls/inventory'

const InventoryForm = ({
    open,
    setOpen,
    reloadData
}) => {

    const [inventoryType, setInventoryType] = useState('in')
    const { currentUser } = useSelector(state => state.users)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const rules = getAntdInputValidation()

    const onFinish = async (values) => {
        try {
            dispatch(SetLoading(true))
            const inventory = {
                ...values,
                inventoryType,
                organization: currentUser._id
            }
            const response = await AddInventory(inventory)
            reloadData()
            dispatch(SetLoading(false))
            if(response.success){
                message.success(response.message)
                setOpen(false)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
            dispatch(SetLoading(false))
        }
    }

    return (
        <Modal
            title='ADD INVENTORY'
            open={open}
            onCancel={() => setOpen(false)}
            centered
            onOk={() => {
                form.submit()
            }}
        >
            <Form
                layout='vertical'
                className='flex flex-col gap-5'
                form={form}
                onFinish={onFinish}
            >
                <Form.Item label='Inventory Type'>
                    <Radio.Group
                        value={inventoryType}
                        onChange={(e) => setInventoryType(e.target.value)}
                    >
                        <Radio value='in'>In</Radio>
                        <Radio value='out'>Out</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item 
                    label='Blood Group' 
                    name='bloodGroup'
                    rules={rules}
                >
                    <Select placeholder="Select the blood group">
                        <Select.Option value='A+'>A+</Select.Option>
                        <Select.Option value='A-'>A-</Select.Option>
                        <Select.Option value='B+'>B+</Select.Option>
                        <Select.Option value='B-'>B-</Select.Option>
                        <Select.Option value='AB+'>AB+</Select.Option>
                        <Select.Option value='AB-'>AB-</Select.Option>
                        <Select.Option value='O+'>O+</Select.Option>
                        <Select.Option value='O-'>O-</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item 
                    label={inventoryType === 'out' ? 'Hospital Email': 'Donar Email'} 
                    name='email'
                    rules={rules}
                >
                    <Input type='email' />
                </Form.Item>

                <Form.Item 
                    label='Quantity(ML)' 
                    name='quantity'
                    rules={rules}
                >
                    <Input type='number' />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default InventoryForm