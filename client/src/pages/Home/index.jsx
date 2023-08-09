import React from 'react'
import { useSelector } from 'react-redux'

import ProtectedPage from '../../components/ProtectedPage'

const Home = () => {
  const {currentUser} = useSelector(state => state.users)
  return (
    <ProtectedPage>
      <>
        <h1>{currentUser?.email}</h1>
        <h1>Home .....</h1>
      </>
    </ProtectedPage>
  )
}

export default Home