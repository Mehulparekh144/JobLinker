import React, { useEffect, useState } from 'react'
import MotionDiv from '../components/MotionDiv'
import { RoughNotation } from 'react-rough-notation'
import JobComponent from '../components/JobComponent'
import axios from 'axios'
import SkeletonLoader from '../components/SkeletonLoader'
import {toast} from 'react-toastify'
import useUserData from '../hooks/useUserData'


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
    const {userData} = useUserData()
    const [location , setLocation] = useState("")
    const [jobTitle , setJobTitle] = useState("")
    const [jobType , setJobType] = useState("")
    const [experience , setExperience] = useState("")

    useEffect(()=>{
        const hasVisitedBefore = localStorage.getItem('visited')

        if(!hasVisitedBefore){
            if(!userData?.profile_id && userData?.role === 'candidate' ){
                toast.info("Complete your profile")
            }
            localStorage.setItem('visited' , 'true') 
        }
    } , [])

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

    const filterJobDetails = () => {
        let filteredJobs = jobDetails;

        if (location) {
            filteredJobs = filteredJobs.filter((job:JobProps) =>
                job.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        if (jobTitle) {
            filteredJobs = filteredJobs.filter((job:JobProps) =>
                job.title.toLowerCase().includes(jobTitle.toLowerCase())
            );
        }

        if (experience) {
            filteredJobs = filteredJobs.filter((job:JobProps) =>
                job.experience.toLowerCase() === experience.toLowerCase()
            );
        }

        if (jobType) {
            filteredJobs = filteredJobs.filter((job:JobProps) =>
                job.type.toLowerCase() === jobType.toLowerCase()
            );
        }

        return filteredJobs;
    };

    const filteredJobDetails = filterJobDetails();

    


    return (
        <MotionDiv className='m-4 md:m-16 '>
            <div className='my-12'>
                <div className='w-max'>
                    <RoughNotation type="box" show={true} color='#fdc500'>
                        <h1 className='text-3xl md:text-5xl z-10'>Job Opportunities</h1>
                    </RoughNotation>
                </div>

                <div className='flex md:flex-row flex-col gap-3 my-4'>
                    <input type="text" placeholder='Location' value={location} onChange={(e)=>setLocation(e.target.value)} />
                    <input type="text" placeholder='Job' value={jobTitle} onChange={(e)=>setJobTitle(e.target.value)} />
                    <select value={experience} onChange={(e)=>setExperience(e.target.value)}>
                        <option value={""}>Years of Experience</option>
                        <option value={"0-1"}>0-1</option>
                        <option value={"1-2"}>1-2</option>
                        <option value={"2-4"}>2-4</option>
                        <option value={"4+"}>4+</option>
                    </select>
                    <select value={jobType} onChange={(e)=>setJobType(e.target.value)}>
                        <option value={""}>Job Type</option>
                        <option value={"internship"}>Internship</option>
                        <option value={"fulltime"}>Full Time</option>
                        <option value={"contract"}>Contract</option>
                    </select>
                </div>
            </div>
            <div className=' flex flex-col md:flex-row flex-wrap gap-4 items-start justify-start  rounded-lg p-4'>
                {
                    isLoading ?
                        filteredJobDetails.map((item: JobProps, index) => (
                            <SkeletonLoader key={index} />
                        )) :
                        filteredJobDetails.map((item: JobProps, index: number) => (
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
