import React, { useEffect, useState } from 'react'
import MotionDiv from '../components/MotionDiv'
import { RoughNotation } from 'react-rough-notation'
import JobComponent from '../components/JobComponent'
import axios from 'axios'
import SkeletonLoader from '../components/SkeletonLoader'

interface JobProps {
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

const Home = () => {

    const [jobDetails, setJobDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoading) {
            axios.get("/job/application").then((response) => {
                setJobDetails(response.data)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            }).catch((error) => {
                console.log(error);
            })
        }



    }, [jobDetails, isLoading ])


    return (
        <MotionDiv className='m-4 md:m-16 '>
            <div className='my-14'>
                <div className='w-max'>
                    <RoughNotation type="box" show={true} color='#fdc500'>
                        <h1 className='text-3xl md:text-5xl z-10'>Job Opportunities</h1>
                    </RoughNotation>
                </div>

                <div className='flex md:flex-row flex-col gap-3 my-4'>
                    <input type="text" placeholder='Location' />
                    <input type="text" placeholder='Job' />
                    <select>
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>Onsite</option>
                    </select>
                </div>
            </div>
            <div className=' flex flex-col md:flex-row flex-wrap gap-4 items-start justify-start  rounded-lg p-4'>
                {
                    isLoading ?
                        jobDetails.map((item: JobProps, index) => (
                            <SkeletonLoader key={index} />
                        )) :
                        jobDetails.map((item: JobProps, index: number) => (
                            <JobComponent title={item.title}
                                id={item.id}
                                key={index}
                                company={item.company}
                                type={item.type}
                                salary={item.salary}
                                location={item.location}
                                applicants={item.applicants}
                                date={item.date}
                                experience={item.experience} />
                        ))
                }
            </div>


        </MotionDiv>
    )
}

export default Home
