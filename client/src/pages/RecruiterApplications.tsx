import React from 'react'
import MotionDiv from '../components/MotionDiv'
import { AiFillPlusCircle } from '@react-icons/all-files/ai/AiFillPlusCircle'
import { Link } from 'react-router-dom'

const RecruiterApplications = () => {

    return (
        <MotionDiv className={`flex flex-col gap-4 m-4 md:mt-2 md:mb-4 md:mx-16`}>
                <h1 className='text-2xl md:text-3xl font-bold z-10'>Applications</h1>
            <Link to={"/user/recruiter/create-application"} className='flex items-center gap-2 bg-main text-second w-max rounded-md px-2 py-1'><AiFillPlusCircle size={18} />Add new application </Link>
        </MotionDiv>

    )
}

export default RecruiterApplications
