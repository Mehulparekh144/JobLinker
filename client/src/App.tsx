import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import axios from 'axios'
import CandidateRoute from './components/CandidateRoute'
import { ToastContainer } from 'react-toastify'
import RecruiterRoute from './components/RecruiterRouter'
import RecruiterApplications from './pages/RecruiterApplications'
import AddApplication from './pages/AddApplication'


function App() {

  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
  axios.defaults.withCredentials = true



  return (
    <>
      <Routes>
        <Route path='/user' element={<Layout />}>
          <Route path='/user/home' element={<Home/>}/>
          <Route path='/user/profile' element={<Profile/>} />
          <Route path='/user/recruiter/applications' element={<RecruiterRoute Component={RecruiterApplications} />} />
          <Route path='/user/recruiter/create-application' element={<RecruiterRoute Component={AddApplication} />} />
        </Route>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="dark"

        toastStyle={{ fontFamily: 'DM Sans' }}
      />
    </>
  )
}

export default App
