import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import MotionDiv from '../components/MotionDiv';
import { AiFillMail } from '@react-icons/all-files/ai/AiFillMail';
import { Link } from 'react-router-dom'
import Loader from '../components/Loader';
import { HiLocationMarker } from '@react-icons/all-files/hi/HiLocationMarker';
import { RoughNotation } from 'react-rough-notation';
import { IoMdArrowDropright } from '@react-icons/all-files/io/IoMdArrowDropright'



const ApplicationPage = () => {
    const { id } = useParams()
    const [applicationData, setApplicationData] = useState({
        company: '',
        about: '',
        title: '',
        location: '',
        experience: '0-1',
        salary: 0,
        type: 'internship',
        requirements: [],
        skills: [],
        perks: [],
        recruiter: '',
        recruiter_email: ''
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoading) {
            axios.get("/job/application/" + id).then((response) => {
                const {
                    company,
                    about,
                    title,
                    location,
                    experience,
                    salary,
                    type,
                    requirements,
                    skills,
                    perks,
                    recruiter_name,
                    recruiter_email
                } = response.data

                setApplicationData({
                    company: company,
                    about: about,
                    title: title,
                    location: location,
                    experience: experience,
                    salary: salary,
                    type: type,
                    requirements: requirements,
                    skills: skills,
                    perks: perks,
                    recruiter: recruiter_name,
                    recruiter_email: recruiter_email
                })

                setIsLoading(false)
            }).catch(() => {
                toast.error("Internal Server error")
            })
        }
    }, [isLoading])

    console.log(applicationData);



    return (
        <MotionDiv className={`flex flex-col gap-4 m-4 md:mt-4 md:mb-4 md:mx-16`}>
            {
                isLoading ?
                    <Loader />
                    :
                    <>

                        <div className='flex flex-row justify-between'>
                            <div className="flex flex-col items-start gap-2 ">
                                <RoughNotation type='highlight' show={true} color='#fdc500'>
                                    <h1 className=' font-bold z-10 text-2xl md:text-3xl'>{applicationData.title}</h1>
                                </RoughNotation>
                                <div className='text-sm md:text-lg flex w-full gap-4'>
                                    <h1>{applicationData.company}</h1>
                                    <div className='flex items-center gap-1 underline'>
                                        <HiLocationMarker /> <Link target='_blank' to={"https://maps.google.com/?q=" + applicationData.location}>{applicationData.location}</Link>
                                    </div>
                                </div>
                                <h1 className='font-bold text-second flex gap-2 items-center'>Recruiter - <AiFillMail />{applicationData.recruiter_email}</h1>
                            </div>
                            <button className='h-max md:mx-16'>Apply</button>
                        </div>
                        <hr />
                        <div className='flex flex-col gap-1 '>
                            <h1 className='text-lg md:text-2xl font-bold'>About Company</h1>
                            <p>{applicationData.about}</p>
                        </div>
                        <hr />
                        <div className='flex gap-4 flex-col md:flex-row justify-start '>
                            <div className='flex flex-col gap-1 w-full md:w-1/3'>
                                <h1 className='text-lg md:text-2xl font-bold'>Requirements</h1>
                                <p className='flex items-center gap-1 break-words '><IoMdArrowDropright />{applicationData.experience} yrs experience needed.</p>
                                {
                                    applicationData.requirements.length > 0 &&
                                    applicationData.requirements.map((item, index) => (
                                        <p className='flex items-center gap-1' key={index}><IoMdArrowDropright />{item}</p>
                                    ))
                                }
                            </div>
                            <div className='flex flex-col gap-1 w-full md:w-1/3'>
                                <h1 className='text-lg md:text-2xl font-bold'>Perks</h1>
                                {
                                    applicationData.perks.length > 0 &&
                                    applicationData.perks.map((item, index) => (
                                        <p className='flex items-center gap-1' key={index}><IoMdArrowDropright />{item}</p>
                                    ))
                                }
                            </div>
                            <div className='flex flex-col gap-1 w-full md:w-1/3 '>
                                <h1 className='text-lg md:text-2xl font-bold'>Skills</h1>
                                <div className="flex flex-wrap gap-2">
                                {
                                    applicationData.skills.length > 0 &&
                                    applicationData.skills.map((item, index) => (
                                        <p className='px-2 py-1 rounded-lg bg-second text-main' key={index}>{item}</p>
                                    ))
                                }
                                </div>
                            </div>
                        </div>

                    </>
            }

        </MotionDiv>
    )
}

export default ApplicationPage
