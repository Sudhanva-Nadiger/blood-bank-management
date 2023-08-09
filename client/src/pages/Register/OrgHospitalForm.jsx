import { Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { getAntdInputValidation } from '../../utils/helper'

const OrgHospitalForm = ({ userType }) => {

    const label = userType === 'hospital' ? 'Hospital Name' : 'Organization Name'
    const rules = getAntdInputValidation()

    return (
        <>
            <Form.Item
                rules={rules}
                label={label}
                name={userType === 'hospital' ? 'hospitalName' : 'organizationName'}
            >
                <Input required  />
            </Form.Item>
            <Form.Item
                rules={rules}
                label={'Owner'}
                name={'owner'}
            >
                <Input required />
            </Form.Item>
            <Form.Item
                rules={rules}
                label={'Email'}
                name={'email'}
            >
                <Input required type='email' />
            </Form.Item>
            <Form.Item
                rules={rules}
                label={'Phone'}
                name={'phone'}
            >
                <Input required />
            </Form.Item>
            <Form.Item
                rules={rules}
                label={'Website'}
                name={'website'}
            >
                <Input required />
            </Form.Item>
            <Form.Item
                rules={rules}
                label={'Password'}
                name={'password'}
            >
                <Input type='password' min={6} />
            </Form.Item>
            <Form.Item
                rules={rules}
                label={'Address'}
                name={'address'}
                className='col-span-2'
            >
                <TextArea />
            </Form.Item>
        </>
    )
}

export default OrgHospitalForm