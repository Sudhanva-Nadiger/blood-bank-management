
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Spinner from './components/Spinner'

function App() {

  const {loading} = useSelector(state => state.loading)
  console.log(loading);

  return (
    <>
        {loading === true ? (<Spinner />) : <></>}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
