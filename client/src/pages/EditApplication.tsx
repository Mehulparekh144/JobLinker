import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiArrowBack } from '@react-icons/all-files/bi/BiArrowBack';
import MotionDiv from '../components/MotionDiv';
import axios from 'axios';
import { toast } from 'react-toastify';
import useUserData from '../hooks/useUserData';



const EditApplication = () => {

    const { userData } = useUserData()
    const { id } = useParams()


    const [formData, setFormData] = useState({
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
    });

    useEffect(() => {
        try {
            axios.get("/recruiter/application/" + userData?.id + "?app_id=" + id).then((response) => {
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
                } = response.data
                
                setFormData({
                    company : company,
                    about : about,
                    title : title,
                    location : location,
                    experience : experience,
                    salary : salary,
                    type : type,
                    requirements : requirements,
                    skills : skills,
                    perks : perks,
                })

            }).catch(() => {
                toast.error("Internal Server error")
            })
        } catch (error) {
            toast.error("Internal Server error")
        }
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let updatedValue: string | string[] | number = value;

        if (name === 'requirements' || name === 'skills' || name === 'perks') {
            updatedValue = value.split(',');
        }

        if (name === 'salary') {
            updatedValue = Number(value)
        }

        setFormData({
            ...formData,
            [name]: updatedValue,
        });
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            axios.put("/recruiter/application/" + userData?.id + "?app_id=" + id , formData).then(() => {
                toast.success("Application updated successfully")
            }).catch(() => {
                toast.error("Internal Server Error")
            })

        } catch (error) {
            toast.error("Internal Server Error")
        }
    };

    return (
        <MotionDiv className={`flex flex-col gap-4 m-4 md:mt-2 md:mb-4 md:mx-16`}>
            <div className='flex gap-4 text-2xl md:text-3xl items-center'>
                <Link to={"/user/recruiter/applications"} className='p-1 bg-main text-second rounded-full'><BiArrowBack /></Link>
                <h1 className=' font-bold z-10'>Edit Application</h1>
            </div>
            <form onSubmit={handleSubmit} className='mt-4 flex flex-col gap-3 '>
                <div>
                    <h1 className='text-xl md:text-2xl font-bold'>Company Details</h1>
                    <div className='my-4 flex flex-col gap-4 bg-gray-100 border-2 border-main p-4 rounded-lg'>
                        <label htmlFor="company" className='w-full'>
                            <h1 className='font-bold'>Company Name</h1>
                            <input type="text" id='company' name='company' placeholder='Amazing Company' onChange={handleInputChange} value={formData.company} />
                        </label>
                        <label htmlFor="about" className='w-full'>
                            <h1 className='font-bold'>About Company</h1>
                            <textarea id='about' name='about' placeholder='Write about your company' onChange={handleInputChange} value={formData.about} />
                        </label>
                    </div>
                </div>
                <div>
                    <h1 className='text-xl md:text-2xl font-bold'>Job Details</h1>
                    <div className='my-4 flex flex-col gap-4 bg-gray-100 border-2 border-main p-4 rounded-lg'>
                        <label htmlFor="title" className='w-full'>
                            <h1 className='font-bold'>Job Title</h1>
                            <input type="text" id='title' name='title' placeholder='Amazing Engineer' onChange={handleInputChange} value={formData.title} />
                        </label>
                        <label htmlFor="location" className='w-full'>
                            <h1 className='font-bold'>Location</h1>
                            <input type="text" id='location' name='location' placeholder='Location' onChange={handleInputChange} value={formData.location} />
                        </label>
                        <label htmlFor="experience" className='w-full'>
                            <h1 className='font-bold'>Experience needed</h1>
                            <select id="experience" name="experience" onChange={handleInputChange} value={formData.experience}>
                                <option value="0-1">0-1</option>
                                <option value="1-2">1-2</option>
                                <option value="2-4">2-4</option>
                                <option value="4+">4+</option>
                            </select>
                        </label>
                        <div className="flex flex-col md:flex-row gap-4 md:items-center">
                            <label htmlFor="salary" className='w-full'>
                                <h1 className='font-bold'>Salary</h1>
                                <input type="number" id='salary' name='salary' placeholder='Salary in $/annum' onChange={handleInputChange} value={formData.salary} />
                            </label>
                            <label htmlFor="type" className='w-full'>
                                <h1 className='font-bold'>Type</h1>
                                <select id="type" name="type" onChange={handleInputChange} value={formData.type}>
                                    <option value="internship">Internship</option>
                                    <option value="contract">Contract</option>
                                    <option value="fulltime">Fulltime</option>
                                </select>
                            </label>
                        </div>
                        <label htmlFor="requirements" className='w-full'>
                            <h1 className='font-bold'>Requirements</h1>
                            <textarea id='requirements' name='requirements' placeholder='Enter requirements separated by comma' onChange={handleInputChange} value={formData.requirements} />
                        </label>
                        <label htmlFor="skills" className='w-full'>
                            <h1 className='font-bold'>Skills</h1>
                            <textarea id='skills' name='skills' placeholder='Enter skills separated by comma' onChange={handleInputChange} value={formData.skills} />
                        </label>
                        <label htmlFor="perks" className='w-full'>
                            <h1 className='font-bold'>Perks</h1>
                            <textarea id='perks' name='perks' placeholder='Enter perks separated by comma' onChange={handleInputChange} value={formData.perks} />
                        </label>
                    </div>
                </div>

                <button>Modify</button>
            </form>
        </MotionDiv>
    )
}

export default EditApplication
