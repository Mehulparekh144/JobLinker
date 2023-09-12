import React from 'react'
import MotionDiv from '../components/MotionDiv'
import ProfileComponent from '../components/ProfileComponent'
import SkillComponent from '../components/SkillComponent'
import useUserData from '../hooks/useUserData'
import Loader from '../components/Loader'

const Profile = () => {

    const { userData, isLoading } = useUserData()

    return (
        <MotionDiv className={`flex flex-col gap-4 m-4  ${isLoading ? 'md:m-16' : 'md:mt-2 md:mb-4 md:mx-16'}`}>
            {
                isLoading ?
                    <Loader />
                    :
                    <MotionDiv>
                        <ProfileComponent />
                        {userData?.role === 'candidate'?<SkillComponent /> : null}
                    </MotionDiv>
            }




        </MotionDiv>
    )
}

export default Profile
