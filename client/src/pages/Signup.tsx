import React from 'react'
import { RoughNotation } from 'react-rough-notation'
import MotionDiv from '../components/MotionDiv'
import { Link } from 'react-router-dom'
import peep7 from '../assets/images/peep-7.png'


const Signup = () => {
    return (
        <MotionDiv className='font-primary h-[95vh] overflow-x-hidden max-w-screen px-4 md:px-32 py-4  border-main border-4 m-4'>
            <div className='flex justify-between items-center'>
                <div className='w-max'>
                    <RoughNotation type='highlight' show={true} color='#fdc500' iterations={5} >
                        <h1 className='text-2xl md:text-5xl'>Signup</h1>
                    </RoughNotation>
                    <p className='text-lg my-2' >First step to unlock dream jobs</p>
                </div>
                <div>
                    <img src={peep7} className='w-16 md:w-40 ' alt="" />
                </div>

            </div>
            <form action="" className='mt-4 flex flex-col gap-3'>
                <label htmlFor="name">
                    <h1 className='font-bold'>Name</h1>
                    <input type="text" id='name' placeholder='John Doe' />
                </label>
                <label htmlFor="email">
                    <h1 className='font-bold'>Email</h1>
                    <input type="email" id='email' placeholder='jd@mail.com' />
                </label>
                <label htmlFor="password">
                    <h1 className='font-bold'>Password</h1>
                    <input type="password" id='password' placeholder='Make it strong like your skills' />
                </label>
                <label htmlFor="role">
                    <h1 className='font-bold'>Role</h1>
                    <select>
                        <option value="">Candidate</option>
                        <option value="">Employer</option>
                    </select>
                </label>
                <h1>Already an user ? <Link to="/login" className='text-second font-bold'>Login here</Link></h1>
                <button>Signup</button>


            </form>
        </MotionDiv>
    )
}

export default Signup
