import React, { ChangeEvent, useState } from 'react'
import { RoughNotation } from 'react-rough-notation'
import MotionDiv from '../components/MotionDiv'
import { Link, useNavigate } from 'react-router-dom'
import peep6 from '../assets/images/peep-6.png'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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

    const loginHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("/user/login", { email, password })
            toast.success("User Logged in Successfully")
            navigate("/user/home")

        }
        catch (err: unknown) {
            if (err.response && err.response.status === 401) {
                toast.error("Invalid Credentials")
                // alert("Invalid Credentials.");
            } else {
                toast.error("User Doesn't exist")
            }
        }

    }


    return (
        <MotionDiv className='font-primary h-[95vh] overflow-x-hidden max-w-screen px-4 md:px-32 py-4  border-main border-4 m-4'>
            <div className='flex justify-between items-center'>
                <div className='w-max'>
                    <RoughNotation type='highlight' show={true} color='#fdc500' iterations={5} >
                        <h1 className='text-2xl md:text-5xl'>Login</h1>
                    </RoughNotation>
                    <p className='text-lg my-2' >Welcome Back !</p>
                </div>
                <div>
                    <img src={peep6} className='w-16 md:w-40 ' alt="" />
                </div>

            </div>
            <form action="" className='mt-4 flex flex-col gap-3' onSubmit={loginHandler}>
                <label htmlFor="email">
                    <h1 className='font-bold'>Email</h1>
                    <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='jd@mail.com' />
                </label>
                <label htmlFor="password">
                    <h1 className='font-bold'>Password</h1>
                    <input type="password" id='password' value={password} onChange={handlePassChange} placeholder='Make it strong like your skills' required />
                    {!isValid && <span className='text-sm text-red-500 font-black'>Password should have 1 Uppercase , 1 Lowercase , 1 special character , 1 Number and should be greater than 8 characters</span>}
                </label>
                <h1>New here ! <Link to="/register" className='text-second font-bold'>Signup here</Link></h1>
                <button disabled={!isValid}>Login</button>


            </form>
            
        </MotionDiv>
    )
}

export default Login
