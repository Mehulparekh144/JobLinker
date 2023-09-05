import express, { Request, Response } from "express";
const router = express.Router()
import { supabase } from "../config/db";
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { isAuthenticated } from "../middlewares/isAuthenticated";
import getDataURI from "../utils/dataURI";
import multerUploader from "../middlewares/multer";
dotenv.config()


const bcryptSalt = bcrypt.genSaltSync(10);

interface TokenType {
    id: number
}


router.route("/signup").post(async (req: Request, res: Response) => {
    try {
        const { name, email, password, role, gender, age } = await req.body
        const data = await supabase.from('users').select().eq('email', email)
        if (data.data.length > 0) {
            return res.status(409).json("User already exists")
        }
        else {
            const { data, error } = await supabase.from('users').insert([{
                name,
                email,
                password: bcrypt.hashSync(password, bcryptSalt),
                role,
                gender,
                age
            },]);
            if (error) {
                throw error
            }
            else {
                return res.json({ message: "User successfully created" })
            }
        }

    } catch (err) {
        return res.status(404).json({ err: err.message })
    }
})

router.route("/login").post(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const data = await supabase.from('users').select().eq('email', email)
    if (data.data && data.data.length > 0) {
        const userData = { ...data.data[0] }
        delete userData.password

        const passwordCompare = bcrypt.compareSync(password, data.data[0].password)
        if (passwordCompare) {
            jwt.sign(
                userData, process.env.JWT_KEY, {}, (err: Error | null, token: string | undefined) => {
                    if (err) throw err
                    res.cookie("token", token).json({ id: userData.id })
                }
            )
        }
        else {
            return res.status(401).json("Invalid credentials")
        }
    }
    else {
        return res.status(404).json("User not found")
    }
})

router.route("/profile").get((req: Request, res: Response) => {
    const { token } = req.cookies

    if (token) {
        jwt.verify(token, process.env.JWT_KEY, {}, async (err, userData: TokenType) => {
            if (err) {
                res.status(404).json(err)
            }
            const jwtData = await supabase.from('users').select().eq('id', userData.id)
            const userDoc = { ...jwtData.data[0] }
            delete userDoc.password
            res.json(userDoc)
        })
    }
    else {
        res.json(null)
    }
})

router.route("/logout").get((req: Request, res: Response) => {
    res.cookie("token", "").json(true)
})

router.route("/skills/:id").post(isAuthenticated,multerUploader.single("resume"), async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { totalWork, recentWorkTitle, recentCompany , skills  } = req.body
        const resume = req.file
        const resumeURI = getDataURI(resume)
        const userData = (await supabase.from('users').select().eq('id', id)).data[0]
    
        
        if (userData.profile_id) {
            const resumeData = await supabase.storage.from('resumeBucket').update(`resume/${userData.name}${id}.pdf`, resumeURI.buffer, {
                cacheControl: '3600',
                upsert: false,
            })
            if (resumeData.error) {
                return res.status(404).json("Internal server error")
            }
            const resumeURL = await supabase.storage.from('resumeBucket').getPublicUrl(resumeData.data.path)
            const profileData = await supabase.from('profiles').update({
                total_work_ex: totalWork,
                recent_title: recentWorkTitle,
                recent_company: recentCompany,
                skills : skills,
                resume: resumeURL.data.publicUrl
            }).eq('id', userData.profile_id)

            return res.json({message : "Profile updated successfully"})
        }
        else {
            const resumeData = await supabase.storage.from('resumeBucket').upload(`resume/${userData.name}${id}.pdf`, resumeURI.buffer, {
                cacheControl: '3600',
                upsert: false,
            })
            if (resumeData.error) {
                return res.status(404).json("Internal server error")
            }
            const resumeURL = await supabase.storage.from('resumeBucket').getPublicUrl(resumeData.data.path)
            const { data, error } = await supabase.from('profiles').insert([{
                total_work_ex: totalWork,
                recent_title: recentWorkTitle,
                recent_company: recentCompany,
                skills : skills,
                resume: resumeURL.data.publicUrl
            }]).select("*")

            if (!error) {
                const updatedUser = await supabase.from('users').update({
                    profile_id: Number(data[0].id)
                }).eq('id', id);

                return res.json({message : "Profile Created successfully"});
            } else {
                return res.status(500).json({ message: "Profile creation failed" });
            }

        }

    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Internal Server Error" })
    }
})


router.route("/skills/:id").get(isAuthenticated , async (req:Request , res:Response) =>{
    try{
        const { id } = req.params
        const userData = (await (supabase.from('users').select().eq('id', id))).data[0]
        if (userData.profile_id) {
            const profileData = ((await (supabase.from('profiles').select().eq('id' , userData.profile_id))).data[0])
            return res.json(profileData)
        }
        else{
            return res.json(null)
        }

    }
    catch{
        return res.json(null)
    }
    
})

export default router