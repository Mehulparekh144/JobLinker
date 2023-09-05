import React, { useEffect, useState } from 'react'
import { MdEdit } from '@react-icons/all-files/md/MdEdit'
import { MdSave } from '@react-icons/all-files/md/MdSave'
import { MdCancel } from '@react-icons/all-files/md/MdCancel'
import useUserData from '../hooks/useUserData'

const ProfileComponent = () => {
    const { userData } = useUserData()
    const [edit, setEdit] = useState(true)



    return (
        <div>
            <div className="flex justify-between items-center">
                <div className='w-max my-4'>
                        <h1 className='text-xl md:text-2xl font-bold z-10'>Profile</h1>

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
            <div className='border-2 bg-gray-100 border-main flex flex-col md:flex-row p-6 rounded-md md:justify-start gap-12 w-full'>
                <div className='relative rounded-full w-28 md:w-52  border-4 border-spacing-4 border-main z-1'>
                    <img src={userData?.avatar} alt="" className='w-full object-cover rounded-full  border-4 border-second' />
                    <button className={`absolute ${edit ? 'hidden' : 'block'} bg-second text-main hover:bg-second/90 rounded-full p-1 cursor-pointer bottom-0 right-0 md:right-8`}  >
                        <MdEdit size={20} />
                    </button>
                </div>
                <div className='w-full'>
                    <div className='flex gap-4 items-center justify-start'>
                        <label htmlFor="name" className='w-full'>
                            <h1 className='font-bold'>Name</h1>
                            <input type="text" id='name' value={userData?.name} placeholder='John Doe' disabled={edit} />
                        </label>
                        <label htmlFor="email" className='w-full'>
                            <h1 className='font-bold'>Email</h1>
                            <input type="email" id='email' value={userData?.email} placeholder='jd@mail.com' disabled={edit} />
                        </label>
                    </div>
                    <div className='flex gap-4 items-center justify-start my-4'>
                        <label htmlFor="age" className='w-full'>
                            <h1 className='font-bold'>Age</h1>
                            <input type="number" id='age' value={userData?.age} placeholder='18' disabled={edit} />
                        </label>
                        <label htmlFor="gender" className='w-full'>
                            <h1 className='font-bold'>Gender</h1>
                            <select name="" id="gender" value={userData?.gender} disabled={edit}>
                                <option value="">Male</option>
                                <option value="">Female</option>
                                <option value="">Prefer Not to Say</option>
                            </select>
                        </label>
                    </div>
                </div>


            </div>

        </div>

    )
}

export default ProfileComponent
