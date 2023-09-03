import React, { useState } from 'react'
import { MdEdit } from '@react-icons/all-files/md/MdEdit'
import { MdSave } from '@react-icons/all-files/md/MdSave'
import { MdCancel } from '@react-icons/all-files/md/MdCancel'

const SkillComponent = () => {
    const [edit, setEdit] = useState(true)

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className='w-max my-4'>
                    
                        <h1 className='text-xl md:text-2xl font-bold z-10'>Additional Details</h1>

                </div>
                <div className='flex gap-4 items-center'>
                    <button className='flex items-center gap-2' onClick={edit ? () => setEdit(false) : () => setEdit(true)}>
                        {edit ? <>
                            <MdEdit size={15} />
                            Edit
                        </> :
                            <>
                                <MdSave size={15} /> Save
                            </>
                        }
                    </button>
                    {
                        !edit &&
                        <button className='flex items-center gap-2 bg-second text-main hover:bg-second/80' onClick={() => setEdit(true)}>
                            <MdCancel size={15} />Cancel

                        </button>

                    }
                </div>
            </div>
            <div className='border-2 border-main p-6  rounded-md md:justify-start gap-12 w-full'>
                <div className='w-full flex flex-col gap-4'>
                    <div>
                        <label htmlFor="work" className='w-full'>
                            <h1 className='font-bold'>Total Work Experience</h1>
                            <select name="" id="work" disabled={edit}>
                                <option value="">0-1</option>
                                <option value="">1-2</option>
                                <option value="">2-4</option>
                                <option value="">4+</option>
                            </select>
                        </label>
                    </div>
                    <div className='flex flex-col gap-4 justify-between md:flex-row'>
                        <label htmlFor="recentTitle" className='w-full'>
                            <h1 className='font-bold'>Recent Work Title</h1>
                            <input type="text" id='recentTitle' placeholder='Enter your recent work title' disabled={edit}/>
                        </label>
                        <label htmlFor="recentCompany" className='w-full'>
                            <h1 className='font-bold'>Recent Company</h1>
                            <input type="text" id='recentCompany' placeholder='Enter your recent company you work for' disabled={edit} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="skills" className='w-full'>
                            <h1 className='font-bold'>Skills</h1>
                            <input type="number" id='skills' placeholder='Enter your skills' className={`${edit ? 'hidden' : 'block'}`} disabled={edit} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="file" className='w-full'>
                            <h1 className='font-bold'>Upload Resume</h1>
                            <input type="file" id='file' accept='.pdf .docx .doc' disabled={edit} />
                        </label>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkillComponent
