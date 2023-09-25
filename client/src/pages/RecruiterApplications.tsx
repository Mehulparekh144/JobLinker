import React, { useEffect, useState } from 'react'
import MotionDiv from '../components/MotionDiv'
import { AiFillPlusCircle } from '@react-icons/all-files/ai/AiFillPlusCircle'
import { Link } from 'react-router-dom'
import useUserData from '../hooks/useUserData'
import axios from 'axios'
import ApplicationComponent from '../components/ApplicationComponent'


const RecruiterApplications = () => {
    const { userData } = useUserData()
    const [applicationData, setApplicationData] = useState([])
    interface PropsType {
        recruiter: string,
        id: string,
        title: string,
        company: string,
        type: string,
        salary: number,
        location: string,
        applicants: number,
        date: string,
        experience: string
    }

    useEffect(() => {
        
            axios.get("/recruiter/application/" + userData?.id).then((response) => {
                setApplicationData(response.data)

            }).catch((error) => {
                console.log(error);
            })
        
    }, [])


    return (
        <MotionDiv className={`flex flex-col gap-4 m-4 md:mt-2 md:mb-4 md:mx-16`}>
            <div className='flex flex-col gap-4 '>
                <h1 className='text-2xl md:text-3xl font-bold z-10'>Applications</h1>
                <Link to={"/user/recruiter/create-application"} className='flex items-center gap-2 bg-main text-second w-max rounded-md px-2 py-1'><AiFillPlusCircle size={18} />Add new application </Link>
                <div className='flex flex-wrap gap-4'>
                    {
                        applicationData.length > 0 ?
                        applicationData.map((item: PropsType, index) => (
                            <ApplicationComponent
                                key={index}
                                recruiter_id={item.recruiter}
                                id={item.id}
                                title={item.title}
                                company={item.company}
                                type={item.type}
                                salary={item.salary}
                                location={item.location}
                                applicants={item.applicants}
                                date={item.date}
                                experience={item.experience}
                            />
                        ))
                        :
                        <div className='w-full mt-6'>
                            <h1 className='text-center text-xl font-medium'>No Applications</h1>
                        </div>

                    }


                </div>
            </div>
        </MotionDiv>

    )
}

export default RecruiterApplications
