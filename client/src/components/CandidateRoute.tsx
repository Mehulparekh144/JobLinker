import React from 'react'
import useUserData from '../hooks/useUserData'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from './Loader';
import MotionDiv from './MotionDiv';


interface CandidateRouteProps {
    Component: React.ComponentType;
}

const CandidateRoute: React.FC<CandidateRouteProps> = ({ Component }) => {
    const { userData, isLoading } = useUserData()
    const location = useLocation()

    if ((!userData && !isLoading) || userData?.role != 'candidate' && !isLoading) {
        return <Navigate to={"/login"} state={{ from: location }} replace />
    }
    else if (isLoading) {
        return <MotionDiv className='m-4 md:m-16'>
            <Loader />
        </MotionDiv>
    }
        return <Component />
    


}

export default CandidateRoute
