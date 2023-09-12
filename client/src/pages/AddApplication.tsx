import React from 'react'
import MotionDiv from '../components/MotionDiv'
import { Link } from 'react-router-dom'
import { BiArrowBack } from '@react-icons/all-files/bi/BiArrowBack'

const AddApplication = () => {
    return (
        <MotionDiv className={`flex flex-col gap-4 m-4 md:mt-2 md:mb-4 md:mx-16`}>
            <div className='flex gap-4 text-2xl md:text-3xl items-center'>
                <Link to={"/user/recruiter/applications"} className='p-1 bg-main text-second rounded-full'><BiArrowBack/></Link>
                <h1 className=' font-bold z-10'>New Application</h1>
            </div>
            <form action="" className='mt-4 flex flex-col gap-3 '>
                <div>
                    <h1 className='text-xl md:text-2xl font-bold'>Company Details</h1>
                    <div className='my-4 flex flex-col gap-4 bg-gray-100 border-2 border-main p-4 rounded-lg'>
                        <label htmlFor="company" className='w-full' >
                            <h1 className='font-bold'>Company Name</h1>
                            <input type="text" id='company' placeholder='Amazing Company' />
                        </label>
                        <label htmlFor="company" className='w-full' >
                            <h1 className='font-bold'>About Company</h1>
                            <textarea id='company' placeholder='Write about your company' />
                        </label>
                    </div>
                </div>
                <div>
                    <h1 className='text-xl md:text-2xl font-bold'>Job Details</h1>
                    <div className='my-4 flex flex-col gap-4 bg-gray-100 border-2 border-main p-4 rounded-lg'>
                        <label htmlFor="title" className='w-full' >
                            <h1 className='font-bold'>Job Title</h1>
                            <input type="text" id='title' placeholder='Amazing Engineer' />
                        </label>
                        <label htmlFor="location" className='w-full' >
                            <h1 className='font-bold'>Location</h1>
                            <input type="text" id='location' placeholder='Location' />
                        </label>
                        <label htmlFor="experience" className='w-full' >
                            <h1 className='font-bold'>Experience needed</h1>
                            <select name="" id="experience" >
                                <option value="0-1">0-1</option>
                                <option value="1-2">1-2</option>
                                <option value="2-4">2-4</option>
                                <option value="4+">4+</option>
                            </select>
                        </label>
                        <div className="flex flex-col md:flex-row gap-4 md:items-center">
                            <label htmlFor="salary" className='w-full' >
                                <h1 className='font-bold'>Salary</h1>
                                <input type="number" id='salary' placeholder='Salary in $/annum' />
                            </label>
                            <label htmlFor="type" className='w-full' >
                                <h1 className='font-bold'>Type</h1>
                                <select name="" id="type" >
                                    <option value="internship">Internship</option>
                                    <option value="contract">Contract</option>
                                    <option value="fulltime">Fulltime</option>
                                </select>
                            </label>
                        </div>
                        <label htmlFor="requirements" className='w-full' >
                            <h1 className='font-bold'>Requirements</h1>
                            <textarea id='requirements' placeholder='Enter requirements seperated by comma' />
                        </label>
                        <label htmlFor="skills" className='w-full' >
                            <h1 className='font-bold'>Skills</h1>
                            <textarea id='skills' placeholder='Enter skills seperated by comma' />
                        </label>
                        <label htmlFor="perks" className='w-full' >
                            <h1 className='font-bold'>Perks</h1>
                            <textarea id='perks' placeholder='Enter perks seperated by comma' />
                        </label>
                    </div>
                </div>

                <button>Add Application</button>

            </form>
        </MotionDiv>
    )
}

export default AddApplication
