import React from 'react'
import { HiLocationMarker } from '@react-icons/all-files/hi/HiLocationMarker'
import { BsCalendar} from '@react-icons/all-files/bs/BsCalendar'
import { IoIosPeople } from '@react-icons/all-files/io/IoIosPeople'
import { Link, useNavigate } from 'react-router-dom'
import useUserData from '../hooks/useUserData'
import axios from 'axios'
import { toast } from 'react-toastify'

interface PropsType{
  id : string,
  title : string,
  company : string,
  type : string,
  salary : number,
  location : string,
  applicants : number,
  date : string,
  experience : string
}


const JobComponent:React.FC<PropsType> = ({title , company , type , salary , location, applicants, date, experience, id}) => {

  const navigate = useNavigate()

  const {userData} = useUserData();

  const applyHandler = (id:PropsType) =>{
      axios.post("/user/apply/" + userData?.id + '?app_id=' + id).then(()=>{
        toast.success("Application sent successfully")
        navigate("/user/my_applications")
      }).catch((error)=>{
        if(error.response.status === 409){
          toast.info("Applied already")
        }
        else{
          toast.error("Internal Server error")
        }
      })




  }


  return (
    <div className='bg-gray-100 w-full md:w-[32.5%] p-6 rounded-lg text-main border-2 border-main'>
      <h1 className='text-2xl font-black '>{title}</h1>
      <h1 className='text-md font-semibold italic text-gray-500'>{company} - {applicants} Applicants</h1> 
      <div className="flex items-center justify-start gap-4 font-bold my-2 font-secondary capitalize">
      <p>{type}</p>
        <p className='flex items-center gap-1'><HiLocationMarker/>{location}</p>
      </div>
      <div className="flex items-center justify-start gap-4">
        <p className='flex items-center gap-1'><BsCalendar/>{date}</p>
        <p className='flex items-center gap-1'><IoIosPeople />{experience} Exp</p>
      </div>
      <p className='font-bold font-secondary text-xl mt-2'>{salary}$/yr</p>
      <div className="flex items-center gap-2 mt-4">
      <button className='w-max' onClick={()=>applyHandler(id)} disabled={userData == null  || userData?.role === 'recruiter'}>Apply</button>
      <Link to={"/user/application/" + id} className='w-max bg-transparent rounded-lg px-3 py-1 text-main font-bold hover:bg-second  transition ease-soft-spring'>View details</Link>
      </div>
      
    </div>
  )
}

export default JobComponent
