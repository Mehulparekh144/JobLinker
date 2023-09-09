import React, { useEffect, useState } from 'react'
import { MdEdit } from '@react-icons/all-files/md/MdEdit'
import { MdSave } from '@react-icons/all-files/md/MdSave'
import { MdCancel } from '@react-icons/all-files/md/MdCancel'
import useUserData from '../hooks/useUserData'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiOutlineMinus } from '@react-icons/all-files/ai/AiOutlineMinus'
import { toast } from 'react-toastify'
import toastOptions from '../utils/toastOptions'

const SkillComponent = () => {
    const { userData, profileData } = useUserData();
    const [edit, setEdit] = useState<boolean>(true)
    const [totalWork, setTotalWork] = useState<string>("0-1")
    const [recentWorkTitle, setRecentWorkTitle] = useState<string>("")
    const [skills, setSkills] = useState<string[]>([])
    const [skillInput, setSkillInput] = useState<string>("")
    const [recentCompany, setRecentCompany] = useState<string>("")
    const [resume, setResume] = useState<string>("")
    const [resumeLink, setResumeLink] = useState<string | null>(null)


    useEffect(() => {
        if (profileData) {
            setTotalWork(profileData.total_work_ex)
            setRecentWorkTitle(profileData.recent_title)
            setRecentCompany(profileData.recent_company)
            setSkills(profileData.skills)
            if (profileData.resume) {
                setResumeLink(profileData.resume)
            }

        }

    }, [])



    const addItemsToSkill = () => {
        setSkills([...skills, skillInput])
        setSkillInput('');
    }

    const removeItemsFromSkill = (skill: string) => {
        let removed = false;

        setSkills(skills.filter((obj) => {
            if (!removed && obj === skill) {
                removed = true;
                return false;
            }
            return true;
        }))

    }

    const removeResumeHandler = () => {
        setResumeLink(null)
    }

    const sendDataHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("/user/skills/" + userData?.id, { totalWork, recentWorkTitle, recentCompany, skills, resume, resumeLink }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            toast.success("Profile updated" , toastOptions)
            setEdit(true)
        }
        catch {
            toast.error("Error encountered" , toastOptions)

        }
    }








    return (
        <div>
            <div className="flex justify-between items-center">
                <div className='w-max my-4'>

                    <h1 className='text-xl md:text-2xl font-bold z-10'>Additional Details</h1>

                </div>
                <div className='flex gap-4 items-center'>
                    {
                        edit ? <button className='flex items-center gap-2' onClick={edit ? () => setEdit(false) : () => setEdit(true)}>
                            <MdEdit size={15} />
                            Edit
                        </button> :
                            <button className='flex items-center gap-2 bg-second text-main hover:bg-second/80' onClick={() => setEdit(true)}>
                                <MdCancel size={15} />Cancel

                            </button>


                    }
                </div>
            </div>
            <div className='border-2 bg-gray-100 border-main p-6  rounded-md md:justify-start gap-12 w-full'>
                <form encType='multipart/form-data' className='w-full flex flex-col gap-4' onSubmit={sendDataHandler}>
                    <div>
                        <label htmlFor="work" className='w-full'>
                            <h1 className='font-bold'>Total Work Experience</h1>
                            <select name="" value={totalWork} onChange={(e) => setTotalWork(e.target.value)} id="work" disabled={edit}>
                                <option value="0-1">0-1</option>
                                <option value="1-2">1-2</option>
                                <option value="2-4">2-4</option>
                                <option value="4+">4+</option>
                            </select>
                        </label>
                    </div>
                    <div className='flex flex-col gap-4 justify-between md:flex-row'>
                        <label htmlFor="recentTitle" className='w-full'>
                            <h1 className='font-bold'>Recent Work Title</h1>
                            <input type="text" id='recentTitle' value={recentWorkTitle} onChange={(e) => setRecentWorkTitle(e.target.value)} placeholder='Enter your recent work title' disabled={edit} />
                        </label>
                        <label htmlFor="recentCompany" className='w-full'>
                            <h1 className='font-bold'>Recent Company</h1>
                            <input type="text" id='recentCompany' placeholder='Enter your recent company you work for' value={recentCompany} onChange={(e) => setRecentCompany(e.target.value)} disabled={edit} />

                        </label>
                    </div>
                    <div>
                        <label htmlFor="skills" className='w-full'>
                            <h1 className='font-bold'>Skills</h1>
                            <div className='flex gap-2 items-center'>
                                <input type="text" id='skills' placeholder='Enter your skills' className={`${edit ? 'hidden' : 'block'}`} value={skillInput} onChange={(e) => setSkillInput(e.target.value)} disabled={edit} />
                                <p hidden={edit} className='cursor-pointer text-3xl' onClick={addItemsToSkill}>+</p>
                            </div>
                            <div className='flex gap-2 flex-wrap mt-4 items-center justify-start'>
                                {
                                    skills && skills.map((item, index) => (
                                        <div key={index} className={`${edit ? 'none' : 'hover:-translate-y-1'} relative w-max bg-second px-4 py-2 text-main rounded-md transition ease-linear `}>
                                            <div className={`${edit ? 'opacity-0' : 'opacity-1'} absolute -top-1 -right-1 bg-main border-1 border-second text-second w-max p-1 rounded-full transition-all ease-in-out delay-50 cursor-pointer `} onClick={() => removeItemsFromSkill(item)}><AiOutlineMinus size={10} /></div>
                                            {item}
                                        </div>
                                    ))
                                }
                            </div>

                        </label>

                    </div>
                    <div>
                        <label htmlFor="file" className='w-full'>
                            <h1 className='font-bold'>Resume</h1>
                            {

                                !resumeLink ?
                                    <div>
                                        <input type="file" id='file' onChange={(e) => setResume(e.target.files[0])} accept='.pdf' disabled={edit} name='file' />
                                        <span className='text-sm text-gray-500 italic'>After uploading please reload to view the resume</span>
                                    </div>
                                    :
                                    <div className='relative'>
                                        <Link target='_blank' to={profileData.resume} className='bg-main hover:bg-main/90 transition-all ease-in-out text-second text-center my-1 flex flex-col p-2 rounded-lg'>
                                            <h1 className="font-bold">
                                                View {userData?.name + ' Resume.pdf'}
                                            </h1>
                                        </Link>
                                        <div className={`${edit ? 'opacity-0' : 'opacity-1'} absolute -top-1 -right-1 bg-second border-2 border-main text-main w-max p-1 rounded-full transition-all ease-in-out delay-50 cursor-pointer `} onClick={removeResumeHandler}><AiOutlineMinus size={15} /></div>
                                    </div>
                            }

                        </label>

                    </div>
                    {!edit &&
                        <button className='flex gap-2 items-center'><MdSave /> Save</button>}
                </form>
            </div>
        </div>
    )
}

export default SkillComponent
