import React, { useState } from 'react'
import { HiMenu } from '@react-icons/all-files/hi/HiMenu'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { RoughNotation } from 'react-rough-notation'
import axios from 'axios'
import useUserData from '../hooks/useUserData'



const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { userData } = useUserData()
    const navigate = useNavigate()

    interface MenuItems {
        title: string,
        link: string
    }

    const menuItems: MenuItems[] = [
        {
            title: 'Profile',
            link: '/user/profile'
        },
        {
            title: 'Home',
            link: '/user/home'
        },
        {
            title: 'Applications',
            link: '/user/applications'
        },
    ]

    const logoutHandler = () => {
        axios.get("/user/logout").then(() => {
            navigate("/login")
            alert("Logged Out")
        }).catch(() => {
            alert("Error while logging out")
        })
    }   


    return (
        <div className={`sticky top-2 flex justify-center my-2 z-50`}>
            <div className='font-primary w-max text-main h-16 flex gap-6   items-center justify-evenly rounded-lg shadow-md bg-background border-2 px-16 border-main'>
                <div className='md:hidden'>
                    <button className='bg-main p-2 rounded-full text-white transition ease-in-out' onClick={() => setIsMenuOpen(true)}>
                        <HiMenu />
                    </button>
                    <motion.div className={`${isMenuOpen ? 'block' : 'hidden'} h-screen -my-2 absolute px-4 bg-white/80 backdrop-blur-3xl top-0 left-0  w-screen transition-all duration-300 flex flex-col justify-start  items-start py-4 gap-3 z-[100]`}
                        initial={{ opacity: 0, y: '-100vh' }}
                        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : '-100vh' }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className='bg-main p-2 rounded-full text-white transition ease-in-out' onClick={() => setIsMenuOpen(false)}>
                            <IoMdClose />
                        </button>
                        <ul className='flex flex-col gap-2 justify-start items-start text-2xl'>
                            {
                                menuItems.map((item: MenuItems, index: number) => (
                                    <li key={index}>
                                        <Link to={item.link} onClick={() => setIsMenuOpen(false)}>
                                            {item.title}
                                        </Link>
                                    </li>
                                ))
                            }
                            {
                                userData ?
                                    <button onClick={logoutHandler}>Logout</button>
                                    :
                                    <>
                                        <li><Link to={"/login"} onClick={() => setIsMenuOpen(false)}>Login</Link></li>
                                        <li><Link to={"/register"} onClick={() => setIsMenuOpen(false)}>Register</Link></li>
                                    </>

                            }
                        </ul>


                    </motion.div>
                </div>

                <div>
                    <RoughNotation type="highlight" color='#fdc500' show={true}>
                        <h1 className='font-bold text-xl'>JobLinker</h1>
                    </RoughNotation>
                </div>
                <div className='hidden md:block'>
                    <ul className='flex gap-5 justify-center items-center'>
                        {
                            menuItems.map((item: MenuItems, index: number) => (
                                <li key={index} className='hover:font-semibold hover:translate-y-1 transition ease-in-out'>
                                    <Link to={item.link}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))
                        }
                        {
                            userData ?
                                <button onClick={logoutHandler}>Logout</button>
                                :
                                <>
                                    <li><Link to={"/login"} onClick={() => setIsMenuOpen(false)}>Login</Link></li>
                                    <li><Link to={"/register"} onClick={() => setIsMenuOpen(false)}>Register</Link></li>
                                </>

                        }

                    </ul>
                </div>


            </div>
        </div>
    )
}

export default NavbarComponent
