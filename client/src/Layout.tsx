import React from 'react'
import {Outlet} from 'react-router-dom'
import NavbarComponent from './components/NavbarComponent'

const Layout = () => {
    return (
        <div className='font-primary '>
            <NavbarComponent/>
            <Outlet/>
        </div>
    )
}

export default Layout
