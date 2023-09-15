import { BsCalendar } from '@react-icons/all-files/bs/BsCalendar'
import { HiLocationMarker } from '@react-icons/all-files/hi/HiLocationMarker'
import { IoIosPeople } from '@react-icons/all-files/io/IoIosPeople'
import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import React from 'react'
import MotionDiv from './MotionDiv'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


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

const ApplicationComponent: React.FC<PropsType> = ({ recruiter_id, id, title, company, type, salary, location, applicants, date, experience }) => {
    return (

                    <MotionDiv className='bg-gray-100 w-full md:w-[32.5%] p-6 rounded-lg text-main border-2 border-main'>
                        <h1 className='text-2xl font-black '>{title}</h1>
                        <h1 className='text-md font-semibold italic text-gray-500'>{company} - {applicants} Applicants</h1>
                        <div className="flex items-center justify-start gap-4 font-bold my-2 font-secondary capitalize ">
                            <p>{type}</p>
                            <p className='flex items-center gap-1'><HiLocationMarker />{location}</p>
                        </div>
                        <div className="flex items-center justify-start gap-4">
                            <p className='flex items-center gap-1'><BsCalendar />{date}</p>
                            <p className='flex items-center gap-1'><IoIosPeople />{experience} Exp</p>
                        </div>
                        <p className='font-bold font-secondary text-xl mt-2'>{salary}$/yr</p>
                        <div className="flex items-center gap-2 mt-4">
                            <Link to={"/user/recruiter/application/" + id} className='bg-main text-second rounded-lg px-3 py-1 w-max flex items-center gap-2'><AiFillEdit /> Edit</Link>
                            <button className='w-max bg-red-500 text-white hover:bg-red-500/90 transition ease-soft-spring flex items-center gap-2' onClick={() => deleteApplication(recruiter_id, id)}><MdDelete />Delete</button>
                        </div>

                    </MotionDiv>



    )
}

export default ApplicationComponent
