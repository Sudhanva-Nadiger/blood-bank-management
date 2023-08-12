
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Spinner from './components/Spinner'
import Profile from './pages/Profile'

function App() {

  const {loading} = useSelector(state => state.loading)

  return (
    <>
        {loading === true ? (<Spinner />) : <></>}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
