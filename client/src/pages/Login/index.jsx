import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Radio, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


import { LoginUser } from '../../apicalls/users'
import { SetLoading } from '../../redux/loaderSlice'
import { getAntdInputValidation } from '../../utils/helper'

const Login = () => {

  const [userType, setUserType] = useState('donar')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    console.log(values);
    try {
      dispatch(SetLoading(true))
      const response = await LoginUser(values)
      dispatch(SetLoading(false))

      if(response.success) {
        message.success(response.message)
        // storing token in local storage
        localStorage.setItem('token', response.data)

        navigate('/')
      } else { 
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(SetLoading(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token') !== null) {
      navigate('/')
    }
  }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <Form
        layout="vertical"
        className='bg-white rounded shadow grid p-5 gap-5 md:w-1/3 w-1/2'
        onFinish={onFinish}
      >
        <h1 className=' text-2xl uppercase'>
          <span className='text-primary'>
            {userType} - login
          </span>
          <hr />
        </h1>
        
        <Radio.Group onChange={(e) => setUserType(e.target.value)} value={userType} className=' flex flex-wrap gap-3'>
          <Radio value='donar'>Donar</Radio>
          <Radio value='hospital'>Hospital</Radio>
          <Radio value='organization'>Organization</Radio>
        </Radio.Group>
            <>
              <Form.Item rules={getAntdInputValidation()} label="Email" name='email'>
                  <Input type='email' required />
              </Form.Item>
              <Form.Item rules={getAntdInputValidation()} label="Password" name='password'>
                <Input type='password' min={6} required />
              </Form.Item>
            </>
        <Button type='primary' className='' htmlType='submit'>
          Login
        </Button>

        <Link to='/register' className=' text-center text-gray-700'>
          Dont have an accont ?
          <span className='font-semibold underline'>Register</span>
        </Link>
      </Form>
    </div>
  )
}

export default Login