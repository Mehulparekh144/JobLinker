import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import axios from 'axios'
import ProtectedRoutes from './components/ProtectedRoutes'
import useUserData from './hooks/useUserData'


function App() {

  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
  axios.defaults.withCredentials = true
  


  return (
    <Routes>
      <Route path='/user' element={<Layout />}>
        <Route path='/user/home' element={<ProtectedRoutes Component={Home}/>} />
        <Route path='/user/profile' element={<ProtectedRoutes Component={Profile}/>} />
      </Route>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
    </Routes>
  )
}

export default App
