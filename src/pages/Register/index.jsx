import React, { useState } from 'react'
import { Button, Form, Input, Radio } from 'antd'
import { Link } from 'react-router-dom'
import OrgHospitalForm from './OrgHospitalForm'

const Register = () => {

  const [userType, setUserType] = useState('donar')

  const onFinish = (values) => {
    console.log(values);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <Form
        layout="vertical"
        className='bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2'
        onFinish={onFinish}
      >
        <h1 className='col-span-2 text-2xl uppercase'>
          <span className='text-primary'>
            {userType} - regitration
          </span>
          <hr />
        </h1>
        
        <Radio.Group onChange={(e) => setUserType(e.target.value)} value={userType} className='col-span-2 flex flex-wrap gap-3'>
          <Radio value='donar'>Donar</Radio>
          <Radio value='hospital'>Hospital</Radio>
          <Radio value='organization'>Organization</Radio>
        </Radio.Group>

        {
          userType === 'donar' ? (
            <>
              <Form.Item label="Name" name='name'>
                <Input required />
              </Form.Item>
              <Form.Item label="Email" name='email'>
                  <Input type='email' required />
              </Form.Item>
              <Form.Item label="Phone" name='phone'>
                  <Input required />
              </Form.Item>
              <Form.Item label="Password" name='passowrd'>
                <Input type='password' min={6} required />
              </Form.Item>
            </>
          ) : <OrgHospitalForm userType={userType} />
        }


        <Button type='primary' className='col-span-2' htmlType='submit'>
          Register
        </Button>

        <Link to='/login' className='col-span-2 text-center text-gray-700'>
          Alredy have an accont ?
          <span className='font-semibold underline'>Login</span>
        </Link>
      </Form>
    </div>
  )
}

export default Register