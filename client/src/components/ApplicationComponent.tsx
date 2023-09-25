import { useState, useEffect } from 'react';
import { BsCalendar } from '@react-icons/all-files/bs/BsCalendar'
import { HiLocationMarker } from '@react-icons/all-files/hi/HiLocationMarker'
import { IoIosPeople } from '@react-icons/all-files/io/IoIosPeople'
import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import React from 'react'
import MotionDiv from './MotionDiv'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion';



interface PropsType {
    recruiter_id: string,
    id: string,
    title: string,
    company: string,
    type: string,
    salary: number,
    location: string,
    applicants: number,
    date: string,
    experience: string,
}

interface UserAppInterface {
    application_data: {
        id: string,
    },
    user_data: {
        name: string,
        id: string,
        email: string,
        age: number,
        gender: string
    },
    profile_data: {
        id: string
    }
    status: string
}


const ApplicationComponent: React.FC<PropsType> = ({ recruiter_id, id, title, company, type, salary, location, applicants, date, experience }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userApp, setUserApp] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("/recruiter/user-application/" + recruiter_id).then((response) => {
            setUserApp(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    const handleProfileDetails = (user_data: {
        id: string
    }, profile_data: object, application_data: object, status: string, recruiter_id: string) => {
        const stateObject = {
            user_data,
            application_data,
            profile_data,
            status,
            recruiter_id
        };
        console.log(stateObject);
        navigate('/user/recruiter/profile?user_id=' + user_data.id, { state: stateObject })

    }



    const deleteApplication = (recruiter_id: string, id: string) => {
        try {
            axios.delete("/recruiter/application/" + recruiter_id + "?app_id=" + id).then(() => {
                toast.success("Application deleted successfully")
            }).catch(() => {
                toast.error("Internal Server error")
            })
        } catch (error) {
            toast.error("Internal Server error")
        }
    }
    return (

        <MotionDiv className='relative bg-gray-100 w-full p-6 rounded-lg text-main border-2 border-main'>
            <div className='flex md:flex-row gap-2 flex-col md:justify-between md:items-start'>
                <div>
                    <div className="flex md:flex-row flex-col gap-1 md:items-center justify-between">
                        <h1 className='text-2xl font-black '>{title}</h1>
                        <div className="flex items-center justify-start gap-3 font-semibold italic my-2 font-secondary capitalize  ">
                            <p>{type}</p>
                            <p className='flex items-center gap-1'><HiLocationMarker />{location}</p>
                        </div>
                    </div>
                    <h1 className='text-md md:my-1 italic text-gray-500'>{company}</h1>
                    <div className="flex items-center justify-start gap-4">
                        <p className='flex items-center gap-1'><BsCalendar />{date}</p>
                        <p className='flex items-center gap-1'><IoIosPeople />{experience} Exp</p>
                    </div>
                    <p className='font-bold font-secondary text-xl mt-2'>{salary}$/yr</p>
                    <button onClick={applicants > 0 ? () => setIsOpen(!isOpen) : () => { }} className='bg-transparent text-main p-0 hover:bg-transparent underline font-bold font-main text-md mt-2'>{applicants} Applicant/s</button>

                </div>
                <div className="flex items-center gap-2 md:mx-6 ">
                    <Link to={"/user/recruiter/application/" + id} className='bg-main text-second rounded-lg px-3 py-1 w-max flex items-center gap-2'><AiFillEdit /> Edit</Link>
                    <button className='w-max bg-red-500 text-white hover:bg-red-500/90 transition ease-soft-spring flex items-center gap-2' onClick={() => deleteApplication(recruiter_id, id)}><MdDelete />Delete</button>
                </div>
            </div>


            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mt-4 flex flex-col gap-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    >
                        {userApp &&
                            userApp.map((item: UserAppInterface, index) => (

                                item.application_data.id === id &&
                                <motion.div
                                    className='flex items-center justify-between px-2 py-1 bg-main/10 rounded-md'
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                >

                                    <h1 className='text-md font-black'>
                                        {item.user_data.name}
                                    </h1>
                                    <p className='text-sm  capitalize font-medium'>Status : &nbsp;
                                        <span className={`px-2 py-1 rounded-lg ${item.status === 'review' ? 'bg-gray-500 text-white' : (item.status === 'reject' ? 'bg-red-500 text-white' : (item.status === 'accept' ? 'bg-emerald-500 text-white' : ''))}`}>
                                            {item.status}
                                        </span>
                                    </p>
                                    <button className='bg-transparent  text-main hover:bg-transparent text-sm underline italic' onClick={() => handleProfileDetails(item.user_data, item.profile_data, item.application_data, item.status, recruiter_id)}>View Details</button>
                                </motion.div>
                            ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </MotionDiv>



    )
}

export default ApplicationComponent
