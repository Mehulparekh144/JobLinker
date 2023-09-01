import {Route, Routes} from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'


function App() {

  return (
    <Routes>
      <Route path='/user' element={<Layout/>}>
        <Route path='/user/home' element={<Home/>} />        
        <Route path='/user/profile' element={<Profile/>} />        
      </Route>
      <Route path='/' element={<Landing/>} /> 
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}/>
    </Routes>
  )
}

export default App
