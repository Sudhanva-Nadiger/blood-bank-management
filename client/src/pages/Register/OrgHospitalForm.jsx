import { Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

const OrgHospitalForm = ({ userType }) => {

    const label = userType === 'hospital' ? 'Hospital Name' : 'Organization Name'

    return (
        <>
            <Form.Item
                label={label}
                name={label}
            >
                <Input required  />
            </Form.Item>
            <Form.Item
                label={'Owner'}
                name={'ewner'}
            >
                <Input required />
            </Form.Item>
            <Form.Item
                label={'Email'}
                name={'email'}
            >
                <Input required type='email' />
            </Form.Item>
            <Form.Item
                label={'Phone'}
                name={'ehone'}
            >
                <Input required />
            </Form.Item>
            <Form.Item
                label={'Website'}
                name={'website'}
            >
                <Input required />
            </Form.Item>
            <Form.Item
                label={'Password'}
                name={'password'}
            >
                <Input type='password' min={6} />
            </Form.Item>
            <Form.Item
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