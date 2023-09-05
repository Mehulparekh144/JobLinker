import React from 'react'
import peep1 from '../assets/images/peep-1.png'
import peep2 from '../assets/images/peep-2.png'
import peep3 from '../assets/images/peep-3.png'
import peep4 from '../assets/images/peep-4.png'
import peep5 from '../assets/images/peep-5.png'
import { AiOutlineArrowRight } from '@react-icons/all-files/ai/AiOutlineArrowRight'
import { RoughNotation } from 'react-rough-notation'
import {Link} from 'react-router-dom'
import MotionDiv from '../components/MotionDiv'
import useUserData from '../hooks/useUserData'

const Landing = () => {
    const {userData} = useUserData()

    return (
        <MotionDiv className='font-primary h-[95vh] overflow-x-hidden max-w-screen flex flex-col justify-center px-4 md:px-32 items-center py-4  border-main border-4 m-4'>
            <div className='flex'>
                <img src={peep1} className='w-16 md:w-40 ' alt="" />
                <img src={peep2} className='w-16 md:w-40 ' alt="" />
                <img src={peep3} className='w-16 md:w-40 ' alt="" />
                <img src={peep4} className='w-16 md:w-40 ' alt="" />
                <img src={peep5} className='w-16 md:w-40 ' alt="" />
            </div>
            <div className='flex flex-col items-start gap-4'>
                <RoughNotation type='highlight' color='#fdc500' iterations={5} show={true}>
                <h1 className='text-3xl md:text-6xl p-1'>JobLinker.com</h1>
                </RoughNotation>
                    <h1 className='text-2xl md:text-5xl h-max'>Bridging Careers, Connecting Opportunities</h1>
                <Link to={userData?`/user/home`:`/login`} className='link-button flex items-center gap-4 group' >
                    Get Started
                    <div className='hidden group-hover:block transition-all ease-in-out'>
                        <AiOutlineArrowRight />
                    </div>

                </Link>
            </div>




        </MotionDiv>
    )
}

export default Landing
