import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MotionDiv from '../components/MotionDiv'
import axios from 'axios'
import { toast } from 'react-toastify'

const RecruiterUserProfile = () => {
    const location = useLocation()
    const user_data = location.state && location.state.user_data
    const profile_data = location.state && location.state.profile_data
    const status = location.state && location.state.status
    const [statusValue, setStatusValue] = useState(status)
    const [customClassName, setCustomClassName] = useState("")
    const application_data = location.state && location.state.application_data
    const recruiter_id = location.state && location.state.recruiter_id



    useEffect(() => {
        if (statusValue === 'review') {
            setCustomClassName("bg-gray-500 text-white")
        }
        if (statusValue === 'reject') {
            setCustomClassName("bg-red-500 text-white")
        }
        if (statusValue === 'accept') {
            setCustomClassName("bg-emerald-500 text-white")
        }
    }, [statusValue])

    const updateStatusHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            axios.put("/recruiter/change-status/" + recruiter_id + '?app_id=' + application_data.id + '?user_id=' + user_data.id , {statusValue}).then(() => {
                toast.success("Status updated")
            }).catch(()=>{
                toast.error("Error whilst updating status")
            })
        } catch (error) {
            toast.error("Error whilst updating status")

        }
    }




    return (
        <MotionDiv className={`flex flex-col gap-4 m-4 md:mt-2 md:mb-4 md:mx-16`}>
            <p className='text-md font-bold my-5'>Application : {application_data.title} - {application_data.id}</p>
            <form className='flex justify-between' onSubmit={updateStatusHandler}>
                <div>
                    <h1 className='text-xl md:text-2xl font-bold z-10 capitalize'>Status : <span className={`px-2 py-1 rounded-xl ${customClassName}`}> {statusValue}</span></h1>
                    <div className='flex w-max gap-4'>
                        <input type="radio" name="status" id="review" value={"review"} onChange={
                            (e) => setStatusValue(e.target.value)} placeholder='' />
                        <label htmlFor="review">Review</label>
                    </div>
                    <div className="flex w-max gap-4">
                        <input type="radio" name="status" id="accept" value={"accept"} onChange={(e) => setStatusValue(e.target.value)} />
                        <label htmlFor="accept">Accept</label>
                    </div>
                    <div className="flex w-max gap-4">
                        <input type="radio" name="status" id="reject" value={"reject"} onChange={(e) => setStatusValue(e.target.value)} />
                        <label htmlFor="reject">Reject</label>

                    </div>
                </div>
                <div>
                    <button disabled={statusValue === status}>Change Status</button>
                </div>

            </form>
            <div>
                <div className="flex justify-between items-center">
                    <div className='w-max my-4'>
                        <h1 className='text-xl md:text-2xl font-bold z-10'>Profile</h1>
                    </div>
                </div>
                <div className='border-2 bg-gray-100 border-main flex flex-col md:flex-row p-6 rounded-md md:justify-start gap-12 w-full'>

                    <div className='w-full'>
                        <div className='flex gap-4 items-center justify-start'>
                            <label htmlFor="name" className='w-full'>
                                <h1 className='font-bold'>Name</h1>
                                <input type="text" id='name' value={user_data.name} disabled={true} />
                            </label>
                            <label htmlFor="email" className='w-full'>
                                <h1 className='font-bold'>Email</h1>
                                <input type="email" id='email' value={user_data.email} placeholder='jd@mail.com' disabled={true} />
                            </label>
                        </div>
                        <div className='flex gap-4 items-center justify-start my-4'>
                            <label htmlFor="age" className='w-full'>
                                <h1 className='font-bold'>Age</h1>
                                <input type="number" id='age' value={user_data.age} placeholder='18' disabled={true} />
                            </label>
                            <label htmlFor="gender" className='w-full'>
                                <h1 className='font-bold'>Gender</h1>
                                <input name="" id="gender" className='capitalize' value={user_data.gender} disabled={true} />

                            </label>
                        </div>

                    </div>


                </div>

            </div>

            <div>
                <div className="flex justify-between items-center">
                    <div className='w-max my-4'>
                        <h1 className='text-xl md:text-2xl font-bold z-10'>Additional Details</h1>
                    </div>
                </div>
                <div className='border-2 bg-gray-100 border-main p-6  rounded-md md:justify-start gap-12 w-full'>
                    <div className='w-full flex flex-col gap-4' >
                        <div>
                            <label htmlFor="work" className='w-full'>
                                <h1 className='font-bold'>Total Work Experience</h1>
                                <input name="" value={profile_data ? profile_data.total_work_ex : 'No Details'} id="work" disabled={true} />

                            </label>
                        </div>
                        <div className='flex flex-col gap-4 justify-between md:flex-row'>
                            <label htmlFor="recentTitle" className='w-full'>
                                <h1 className='font-bold'>Recent Work Title</h1>
                                <input type="text" id='recentTitle' value={profile_data ? profile_data.recent_title : 'No Details'} placeholder='Enter your recent work title' disabled={true} />
                            </label>
                            <label htmlFor="recentCompany" className='w-full'>
                                <h1 className='font-bold'>Recent Company</h1>
                                <input type="text" id='recentCompany' placeholder='Enter your recent company you work for' value={profile_data ? profile_data.recent_company : 'No Details'} disabled={true} />

                            </label>
                        </div>
                        <div>
                            <label htmlFor="skills" className='w-full'>
                                <h1 className='font-bold'>Skills</h1>
                                <div className='flex gap-2 flex-wrap mt-4 items-center justify-start'>
                                    {
                                        profile_data ? profile_data.skills && profile_data.skills.map((item: string, index: number) => (
                                            <div key={index} className={`hover:-translate-y-1 relative w-max bg-second px-4 py-2 text-main rounded-md transition ease-linear `}>
                                                {item}
                                            </div>
                                        )) :
                                            'No Skills'
                                    }
                                </div>

                            </label>

                        </div>
                        <div>
                            <label htmlFor="file" className='w-full'>
                                <h1 className='font-bold'>Resume</h1>
                                {
                                    <div className='relative'>
                                        {
                                            profile_data && profile_data.resume ?
                                                <Link target='_blank' to={profile_data.resume} className='bg-main hover:bg-main/90 transition-all ease-in-out text-second text-center my-1 flex flex-col p-2 rounded-lg'>
                                                    <h1 className="font-bold">
                                                        View {user_data.name + ' Resume.pdf'}
                                                    </h1>
                                                </Link> :
                                                <h1>No Resume given</h1>
                                        }

                                    </div>
                                }

                            </label>

                        </div>

                    </div>
                </div>
            </div>

        </MotionDiv>
    )
}

export default RecruiterUserProfile
