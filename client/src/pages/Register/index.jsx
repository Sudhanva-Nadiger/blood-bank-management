import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Radio, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import OrgHospitalForm from './OrgHospitalForm'
import { RegisterUser } from '../../apicalls/users'
import { useDispatch } from 'react-redux'
import { SetLoading } from '../../redux/loaderSlice'
import { getAntdInputValidation } from '../../utils/helper'

const Register = () => {

  const [userType, setUserType] = useState('donar')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const rules = getAntdInputValidation()

  const onFinish = async (values) => {
    try {

      dispatch(SetLoading(true))
      const response = await RegisterUser({
        ...values,
        userType
      })
      dispatch(SetLoading(false))

      console.log(response);
      if(response.success) {
        message.success(response.message)
        navigate('/login')
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(SetLoading(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('/')
    }
  }, [navigate])

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
              <Form.Item rules={rules} label="Name" name='name'>
                <Input required />
              </Form.Item>
              <Form.Item rules={rules} label="Email" name='email'>
                  <Input type='email' required />
              </Form.Item>
              <Form.Item rules={rules} label="Phone" name='phone'>
                  <Input required />
              </Form.Item>
              <Form.Item rules={rules} label="Password" name='password'>
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