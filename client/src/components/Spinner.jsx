import React from 'react';
import { Space, Spin } from 'antd';

const Spinner = () => {
  return (
    <div
      className='fixed inset-0 bg-zinc-950 opacity-90 z-50 flex items-center justify-center'
    >
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  )
}

export default Spinner