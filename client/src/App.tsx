import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import axios from 'axios'
import ProtectedRoutes from './components/ProtectedRoutes'
import {ToastContainer} from 'react-toastify'


function App() {

  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
  axios.defaults.withCredentials = true
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }



  return (
    <>
    <Routes>
      <Route path='/user' element={<Layout />}>
        <Route path='/user/home' element={<ProtectedRoutes Component={Home} />} />
        <Route path='/user/profile' element={<ProtectedRoutes Component={Profile} />} />
      </Route>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
    </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
