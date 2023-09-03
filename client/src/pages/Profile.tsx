import React from 'react'
import MotionDiv from '../components/MotionDiv'
import ProfileComponent from '../components/ProfileComponent'
import SkillComponent from '../components/SkillComponent'
import useUserData from '../hooks/useUserData'
import Loader from '../components/Loader'

const Profile = () => {

    const {isLoading} = useUserData()

    return (
        <MotionDiv className='flex flex-col gap-4 m-4 md:m-16'>
            {
                isLoading ? 
                <Loader/>
                :
                <MotionDiv>
                <ProfileComponent/>
                <SkillComponent/>
                </MotionDiv>

            }
            

        </MotionDiv>
    )
}

export default Profile
