import React from 'react'
import { RoughNotation } from 'react-rough-notation'
import MotionDiv from '../components/MotionDiv'
import {Link} from 'react-router-dom'
import peep6 from '../assets/images/peep-6.png'


const Login = () => {
    return (
        <MotionDiv className='font-primary h-[95vh] overflow-x-hidden max-w-screen px-4 md:px-32 py-4  border-main border-4 m-4'>
            <div className='flex justify-between items-center'>
                <div className='w-max'>
                    <RoughNotation type='highlight' show={true} color='#fdc500' iterations={5} >
                        <h1 className='text-2xl md:text-5xl'>Login</h1>
                    </RoughNotation>
                <p className='text-lg my-2' >Welcome Back !</p>
                </div>
                <div>
                    <img src={peep6} className='w-16 md:w-40 ' alt="" />
                </div>

            </div>
            <form action="" className='mt-4 flex flex-col gap-3'>
                <label htmlFor="email">
                    <h1 className='font-bold'>Email</h1>
                    <input type="email" id='email' placeholder='jd@mail.com' />
                </label>
                <label htmlFor="password">
                    <h1 className='font-bold'>Password</h1>
                    <input type="password" id='password' placeholder='xxxxxxxxxx' />
                </label>
                <label htmlFor="role">
                    <h1 className='font-bold'>Role</h1>
                    <select>
                        <option value="">Candidate</option>
                        <option value="">Employer</option>
                    </select>
                </label>
                <h1>New here ! <Link to="/register" className='text-second font-bold'>Signup here</Link></h1>
                <button>Login</button>
                

            </form>
        </MotionDiv>
    )
}

export default Login
