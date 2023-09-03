import React, { useState, ChangeEvent } from 'react'
import { RoughNotation } from 'react-rough-notation'
import MotionDiv from '../components/MotionDiv'
import { Link, useNavigate } from 'react-router-dom'
import peep7 from '../assets/images/peep-7.png'
import axios from 'axios'


const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState(1)
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("candidate")
    const [gender, setGender] = useState("female")
    const [isValid, setIsValid] = useState(false)
    const navigate = useNavigate()

    const validatePassword = (value: string) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(value);
        const hasNumber = /\d/.test(value);
        const isLengthValid = value.length > 8;

        return hasUppercase && hasLowercase && hasSpecialCharacter && hasNumber && isLengthValid;
    }

    const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsValid(validatePassword(newPassword));
    }

    const registerHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('/user/signup', { name, email, password, age, role, gender })
            alert("User created successfully")
            setName("")
            setEmail("")
            setAge(1)
            setGender("female")
            setPassword("")
            setRole("candidate")
            navigate("/login")

        }
        catch (err:unknown) {
            if (err.response && err.response.status === 409) {
                alert("User already exists. Please login.");
            } else {
                alert("Internal server error. Please try again later.");
            }
        }
    }



    return (
        <MotionDiv className='font-primary h-[95vh] overflow-x-hidden max-w-screen px-4 md:px-32 py-4  border-main border-4 m-4'>
            <div className='flex justify-between items-center'>
                <div className='w-max'>
                    <RoughNotation type='highlight' show={true} color='#fdc500' iterations={5} >
                        <h1 className='text-2xl md:text-5xl'>Signup</h1>
                    </RoughNotation>
                    <p className='text-lg my-2' >First step to unlock dream jobs</p>
                </div>
                <div>
                    <img src={peep7} className='w-16 md:w-40 ' alt="" />
                </div>

            </div>
            <form action="" onSubmit={registerHandler} className='mt-4 flex flex-col gap-3'>
                <div className="flex items-center gap-4">
                    <label htmlFor="name" className='w-full'>
                        <h1 className='font-bold'>Name</h1>
                        <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='John Doe' required/>
                    </label>
                    <label htmlFor="email" className='w-full'>
                        <h1 className='font-bold'>Email</h1>
                        <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='jd@mail.com' required/>
                    </label>
                </div>
                <label htmlFor="age">
                    <h1 className='font-bold'>Age</h1>
                    <input type="number" id='age' value={age} onChange={(e) => setAge(e.target.valueAsNumber)} placeholder='18' required/>
                </label>
                <label htmlFor="password">
                    <h1 className='font-bold'>Password</h1>
                    <input type="password" id='password' value={password} onChange={handlePassChange} placeholder='Make it strong like your skills' required/>
                    {!isValid && <span className='text-sm text-red-500 font-black'>Password should have 1 Uppercase , 1 Lowercase , 1 special character , 1 Number and should be greater than 8 characters</span>}
                </label>
                <div className="flex items-center gap-4">
                    <label htmlFor="role" className='w-full'>
                        <h1 className='font-bold'>Role</h1>
                        <select value={role} onChange={(e) => setRole(e.target.value)} id='role'>
                            <option value="candidate">Candidate</option>
                            <option value="employer">Employer</option>
                        </select>
                    </label>
                    <label htmlFor="gender" className='w-full'>
                        <h1 className='font-bold'>Gender</h1>
                        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="pnts">Prefer Not to Say</option>
                        </select>
                    </label>
                </div>
                <h1>Already an user ? <Link to="/login" className='text-second font-bold'>Login here</Link></h1>
                <button disabled={!isValid}>Signup</button>


            </form>
        </MotionDiv>
    )
}

export default Signup
