import React from 'react'
import MotionDiv from '../components/MotionDiv'
import {RoughNotation} from 'react-rough-notation'

const Profile = () => {
    return (
        <MotionDiv className=' m-4 md:m-16'>
            <div className='w-max my-4'>
                <RoughNotation type="box" show={true} color='#fdc500'>
                    <h1 className='text-3xl md:text-5xl z-10'>Profile</h1>
                </RoughNotation>
            </div>

            <div className='border-2 border-main'>
                

            </div>

        </MotionDiv>
    )
}

export default Profile
