import React from 'react'
import ProtectedPage from '../../components/ProtectedPage'

const index = () => {
  return (
    <ProtectedPage>
      <div>index</div>
    </ProtectedPage>
  )
}

export default index