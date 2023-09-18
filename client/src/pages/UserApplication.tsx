import React from 'react'
import MotionDiv from '../components/MotionDiv'
import { RoughNotation } from 'react-rough-notation'
import useUserData from '../hooks/useUserData'
import Loader from '../components/Loader'
import UserApplicationComponent from '../components/UserApplicationComponent'
import { Link } from 'react-router-dom'
import { BiSearch } from '@react-icons/all-files/bi/BiSearch'

interface PropsType {
    id: string,
    title: string,
    company: string,
    type: string,
    salary: number,
    applicants: number,
    status: string,

}

const UserApplication = () => {

    const {isLoading , applicationData} = useUserData()
    

    return (
        <MotionDiv className={`flex flex-col gap-4 m-4  ${isLoading ? 'md:m-16' : 'md:mt-2 md:mb-4 md:mx-16'}`}>
        {
            isLoading ? 
            <Loader/>
            :
            <>
            <div className='w-max'>
            <RoughNotation type='highlight' show={true} color='#fdc500'>
                <h1 className='font-bold z-10 text-2xl md:text-3xl'>My Applications</h1>
            </RoughNotation>
            </div>
            <div className="flex gap-2 flex-col my-4">
                {
                    applicationData.length > 0 ? 
                    applicationData.map((item:PropsType , index)=>(
                        <UserApplicationComponent
                        key={index}
                        title={item.title}
                        company={item.company}
                        id = {item.id}
                        type = {item.type}
                        salary={item.salary}
                        applicants={item.applicants}
                        status={item.status}

                        />
                    ))
                    :
                    <div className='w-full h-full my-16  flex flex-col items-center justify-center'>
                        <h1 className='text-xl font-bold md:text-2xl'>No Applications yet ! </h1>
                        <Link to={"/user/home"} className='px-3 py-1 bg-second rounded-lg cursor-pointer my-2 hover:translate-y-2 transition ease-linear flex gap-2 items-center ' ><BiSearch/>Browse Here</Link>
                    </div>
                }


            </div>
            </>
        }
        </MotionDiv>
    )
}

export default UserApplication
