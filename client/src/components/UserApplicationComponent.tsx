import React from 'react'
import MotionDiv from './MotionDiv'
import {BiTimeFive} from '@react-icons/all-files/bi/BiTimeFive'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import useUserData from '../hooks/useUserData'

interface PropsType {
    id: string,
    title: string,
    company: string,
    type: string,
    salary: number,
    applicants : number,
    status : string,
    
}

const UserApplicationComponent:React.FC<PropsType> = ({id,title , company , applicants , salary , status }) => {
    const {userData} = useUserData();

    const withdrawApplication = (id: string) => {
        axios.delete("/user/my-applications/" + userData?.id + '?app_id=' + id).then(()=>{
            toast.success("Application withdrawn successfully")
        }).catch(()=>{
            toast.error("Internal server error")
        })
    }

    return (
        <MotionDiv className='bg-gray-100 flex md:flex-row flex-col md:justify-between w-full p-6 rounded-lg text-main border-2 border-main'>
            <div className='w-full'>
            <h1 className='text-xl md:text-2xl font-black '>{title}</h1>
            <h1 className='text-sm md:text-md font-semibold italic text-gray-500'>{company} - {applicants} Applicants</h1>
            <p className='font-bold font-secondary text-lg md:text-xl mt-2'>{salary}$/yr</p>
                <p className=' font-primary text-md md:text-lg mt-2 capitalize flex gap-2 items-center'><BiTimeFive /> Status - <span className={`px-2 py-1 rounded-lg ${status === 'review' ? 'bg-gray-500 text-white' : (status === 'reject' ? 'bg-red-500 text-white' : (status === 'accept' ? 'bg-emerald-500 text-white' : ''))}`}>
                    {status}
                </span></p>
            </div>
            <div className='flex gap-2 w-full items-start my-2 md:justify-end'>
                <button className='w-max' onClick={()=>withdrawApplication(id)}>Withdraw</button>
                <Link to={"/user/application/" + id} className='w-max bg-transparent rounded-lg px-3 py-1 text-main font-bold hover:bg-second  transition ease-soft-spring'>View details</Link>
            </div>
            


        </MotionDiv>

    )
}

export default UserApplicationComponent
