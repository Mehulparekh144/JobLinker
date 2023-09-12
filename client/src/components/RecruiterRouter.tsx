import React from 'react'
import useUserData from '../hooks/useUserData'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from './Loader';
import MotionDiv from './MotionDiv';


interface RecruiterRouteProps {
    Component: React.ComponentType;
}

const RecruiterRoute: React.FC<RecruiterRouteProps> = ({ Component }) => {
    const { userData, isLoading } = useUserData()
    const location = useLocation()

    if ((!userData && !isLoading) || (userData?.role != 'recruiter' && !isLoading)) {
        return <Navigate to={"/login"} state={{ from: location }} replace />
    }
    else if (isLoading) {
        return <MotionDiv className='m-4 md:m-16'>
            <Loader />
        </MotionDiv>
    }
    return <Component />


}

export default RecruiterRoute
