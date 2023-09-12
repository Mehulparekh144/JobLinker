import React, { useEffect, useState } from 'react'
import { MdEdit } from '@react-icons/all-files/md/MdEdit'
import { MdSave } from '@react-icons/all-files/md/MdSave'
import { MdCancel } from '@react-icons/all-files/md/MdCancel'
import useUserData from '../hooks/useUserData'
import axios from 'axios'
import {toast} from 'react-toastify'

const ProfileComponent = () => {
    const { userData } = useUserData()
    const [edit, setEdit] = useState(true)

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [age, setAge] = useState(1)
    const [gender, setGender] = useState<string>("female")

    useEffect(() => {
        if (userData) {
            setName(userData.name)
            setEmail(userData.email)
            setAge(userData.age)
            setGender(userData.gender)
        }
    }, [])

    const updateDataHandler = async (e: React.SyntheticEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            await axios.put("/user/profile/" + userData?.id , {name , email , age , gender})
            toast.success("Profile  updated" )
            setEdit(true)
        }
        catch(err){
            console.log(err);
            toast.error("Error" )
        }

    }



    return (
        <div>
            <div className="flex justify-between items-center">
                <div className='w-max my-4'>
                    <h1 className='text-xl md:text-2xl font-bold z-10'>Profile</h1>

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
            <div className='border-2 bg-gray-100 border-main flex flex-col md:flex-row p-6 rounded-md md:justify-start gap-12 w-full'>

                <form className='w-full' onSubmit={updateDataHandler}>
                    <div className='flex gap-4 items-center justify-start'>
                        <label htmlFor="name" className='w-full'>
                            <h1 className='font-bold'>Name</h1>
                            <input type="text" id='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='John Doe' disabled={edit} />
                        </label>
                        <label htmlFor="email" className='w-full'>
                            <h1 className='font-bold'>Email</h1>
                            <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='jd@mail.com' disabled={edit} />
                        </label>
                    </div>
                    <div className='flex gap-4 items-center justify-start my-4'>
                        <label htmlFor="age" className='w-full'>
                            <h1 className='font-bold'>Age</h1>
                            <input type="number" id='age' value={age} onChange={(e)=>setAge(e.target.value)} placeholder='18' disabled={edit} />
                        </label>
                        <label htmlFor="gender" className='w-full'>
                            <h1 className='font-bold'>Gender</h1>
                            <select name="" id="gender" value={gender} onChange={(e)=>setGender(e.target.value)} disabled={edit}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="pnts">Prefer Not to Say</option>
                            </select>
                        </label>
                    </div>
                    {!edit &&
                        <button className='flex gap-2 items-center'><MdSave /> Save</button>}
                </form>


            </div>

        </div>

    )
}

export default ProfileComponent
