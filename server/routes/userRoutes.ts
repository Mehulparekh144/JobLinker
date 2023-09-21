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
    id: string
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

router.route("/profile/:id").put(isAuthenticated, async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, age, email, gender } = req.body
    console.log(name);
    const { data, error } = await supabase.from("users").update({
        name: name,
        email: email,
        age: age,
        gender: gender
    }).eq('id', id)

    if (error) {
        return res.status(404).json("Internal server error")
    }
    return res.json({ message: "Profile Updated", data: data })
})

router.route("/logout").get((req: Request, res: Response) => {
    res.cookie("token", "").json(true)
})

router.route("/skills/:id").post(isAuthenticated, multerUploader.single("resume"), async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { totalWork, recentWorkTitle, recentCompany, skills, resumeLink } = req.body
        const userData = (await supabase.from('users').select().eq('id', id)).data[0]



        if (userData.profile_id) {
            if (resumeLink) {
                const profileData = await supabase.from('profiles').update({
                    total_work_ex: totalWork,
                    recent_title: recentWorkTitle,
                    recent_company: recentCompany,
                    skills: skills,
                }).eq('id', userData.profile_id)

                return res.json({ message: "Profile updated successfully" })

            }
            else {
                const resume = req.file
                const resumeURI = getDataURI(resume)
                const resumeData = await supabase.storage.from('resumeBucket').upload(`resume/${userData.name}${Date.now()}${id}.pdf`, resumeURI.buffer, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: 'application/pdf'
                })
                if (resumeData.error) {
                    console.log(resumeData.error);

                    return res.status(404).json("Internal server error")
                }
                const resumeURL = await supabase.storage.from('resumeBucket').getPublicUrl(resumeData.data.path)
                const profileData = await supabase.from('profiles').update({
                    total_work_ex: totalWork,
                    recent_title: recentWorkTitle,
                    recent_company: recentCompany,
                    skills: skills,
                    resume: resumeURL.data.publicUrl
                }).eq('id', userData.profile_id)

                return res.json({ message: "Profile updated successfully" })
            }
        }
        else {
            const resume = req.file
            const resumeURI = getDataURI(resume)
            const resumeData = await supabase.storage.from('resumeBucket').upload(`resume/${userData.email}${id}.pdf`, resumeURI.buffer, {
                cacheControl: '3600',
                upsert: false,
                contentType: 'application/pdf'
            })
            if (resumeData.error) {
                console.log(resumeData.error);

                return res.status(404).json("Internal server error")
            }
            const resumeURL = await supabase.storage.from('resumeBucket').getPublicUrl(resumeData.data.path)
            const { data, error } = await supabase.from('profiles').insert([{
                total_work_ex: totalWork,
                recent_title: recentWorkTitle,
                recent_company: recentCompany,
                skills: skills,
                resume: resumeURL.data.publicUrl
            }]).select("*")


            if (!error) {
                const updatedUser = await supabase.from('users').update({
                    profile_id: data[0].id
                }).eq('id', id);


                return res.json({ message: "Profile Created successfully" });
            } else {
                return res.status(500).json({ message: "Profile creation failed" });
            }

        }

    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Internal Server Error" })
    }
})


router.route("/skills/:id").get(isAuthenticated, async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userData = (await (supabase.from('users').select().eq('id', id))).data[0]
        if (userData.profile_id) {
            const profileData = ((await (supabase.from('profiles').select().eq('id', userData.profile_id))).data[0])
            return res.json(profileData)
        }
        else {
            return res.json(null)
        }

    }
    catch {
        return res.json(null)
    }

})


router.route("/resume/:id").delete(isAuthenticated, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userData = (await (supabase.from('users').select().eq('id', id))).data[0]

        const { data, error } = await supabase.from('profiles').update({
            resume: null
        }).eq('id', userData.profile_id);
        if (error) {
            // console.log(error);

            return res.status(404).json("Internal Server error");
        }
        return res.status(200).json("Resume deleted successfully");
    }
    catch (err) {
        // console.log(err);
        res.status(404).json("Internal Server error");
    }
})

router.route("/apply/:id").post(isAuthenticated, async (req: Request, res: Response) => {
    const { id } = req.params
    const app_id = req.query.app_id
    try {
        const userData = await supabase.from('users').select("*").eq('id', id).single()
        const appData = await supabase.from("applications").select("*").eq('id', app_id).single()
        const userAppData = await supabase.from("userapplications").select("*").eq('user_id', id).eq('application_id', app_id).single()
        if (userAppData.data) {
            return res.status(409).json("Applied already")
        }
        if (appData.data && !appData.error) {

            await supabase.from("applications").update({
                applicants: appData.data.applicants + 1
            }).eq('id', app_id)

            const { data, error } = await supabase.from("userapplications").insert([{
                user_id: id,
                application_id: app_id,
                recruiter_id: appData.data.recruiter,
                profile_id: userData.data.profile_id
            },])
            if (error) {

                return res.status(404).json({ message: "Internal server error", error: error })
            }
            return res.json("Applied successfully")
        }
        else {
            return res.status(404).json("Application not found")
        }

    } catch (error) {


        return res.status(404).json({ message: "Internal server error", error: error })
    }
})


router.route("/my-applications/:id").get(isAuthenticated, async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const { data, error } = await supabase.from("userapplications").select("application_id , status").eq('user_id', id)

        if (error) {
            return res.status(404).json({ message: "Internal server error", error: error })
        }

        const applicationIdMap = data.reduce((acc, row) => {
            acc[row.application_id] = row.status
            return acc;
        }, {})

        const applicationData = await supabase.from("applications").select("*").in('id', Object.keys(applicationIdMap))
        if (applicationData.error) {
            return res.status(404).json({ message: "Internal server error", error: error })
        }

        const combinedData = applicationData.data.map((application) => ({
            ...application,
            status: applicationIdMap[application.id],
        }));
        return res.json(combinedData)


    } catch (error) {

    }
})

router.route("/my-applications/:id").delete(isAuthenticated, async (req: Request, res: Response) => {
    const { id } = req.params
    const app_id = req.query.app_id

    try {
        const appData = await supabase.from("applications").select("*").eq('id', app_id).single()
        const { data, error } = await supabase.from("userapplications").delete().eq('user_id', id).eq
            ('application_id', app_id)
        if (error) {
            return res.status(404).json({ message: "Internal server error", error: error })
        }

        await supabase.from("applications").update({
            applicants: appData.data.applicants - 1
        }).eq('id', app_id)


        return res.json("Application deleted successfully")
    } catch (error) {
        return res.status(404).json({ message: "Internal server error", error: error })
    }
})


export default router