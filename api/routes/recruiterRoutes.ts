import express, { Request, Response } from "express";
const router = express.Router()
import { supabase } from "../config/db";
import dotenv from 'dotenv'
import { isRecruiter } from "../middlewares/isRecruiter";
dotenv.config()




router.route("/application/:id").post(isRecruiter, async (req: Request, res: Response) => {
    const {
        title, company, about, location, experience, salary, type, requirements, skills, perks
    } = req.body
    const { id } = req.params


    try {
        const { data, error } = await supabase.from("applications").insert({
            title: title, company: company, about: about, applicants: 0, location: location, date: new Date().toISOString(), experience: experience, salary: salary, type: type, requirements: requirements, skills: skills, perks: perks, recruiter: id
        }).select()
        if (error) {
            res.status(404).json({ message: "Internal server error", error: error })
        }

        return res.json({ message: "Application created successfully" })

    }
    catch (err) {
        res.status(404).json("Internal server error")

    }
})

router.route("/application/:id").get(isRecruiter, async (req: Request, res: Response) => {
    const { id } = req.params
    const app_id = req.query.app_id
    if (app_id) {
        try {
            const { data, error } = await supabase.from("applications").select("*").eq('id', app_id).single()
            if (error) {
                return res.status(404).json({ message: "Internal server error", err: error.message })
            }
            return res.json(data)

        } catch (error) {
            return res.status(404).json({ message: "Internal server error", err: error.message })
        }
    }
    else {
        try {
            const { data, error } = await supabase.from("applications").select("*").eq('recruiter', id)
            if (error) {
                return res.status(404).json({ message: "Internal server error", err: error.message })
            }
            return res.json(data)
        }
        catch (error) {
            return res.status(404).json({ message: "Internal server error", err: error.message })

        }
    }
})


router.route("/application/:id").delete(isRecruiter, async (req: Request, res: Response) => {
    const app_id = req.query.app_id
    try {
        const { data, error } = await supabase.from("applications").delete().eq('id', app_id)
        if (error) {
            return res.status(404).json({ message: "Internal Server Error", error: error.message })
        }
        return res.json({ message: "Application deleted successfully", app_id: app_id })
    } catch (error) {
        return res.status(404).json({ message: "Internal Server Error", error: error.message })
    }
})

router.route("/application/:id").put(isRecruiter, async (req: Request, res: Response) => {
    const app_id = req.query.app_id
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
    } = req.body
    try {
        const { data, error } = await supabase.from("applications").update(
            {
                company: company,
                about: about,
                title: title,
                location: location,
                experience: experience,
                salary: salary,
                type: type,
                requirements: requirements,
                skills: skills,
                perks: perks,
            }
        ).eq('id', app_id).single()
        if (error) {
            return res.status(404).json({ message: "Internal Server Error", error: error.message })
        }
        return res.json({ message: "Application updated successfully", app_id: app_id, data: data })
    } catch (error) {
        return res.status(404).json({ message: "Internal Server Error", error: error.message })
    }
})

router.route("/user-application/:id").get(isRecruiter, async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const userAppData = await supabase.from('userapplications').select("*").eq('recruiter_id', id);

        if (userAppData.error) {
            return res.status(404).json({ message: "Internal Server Error", error: userAppData.error.message });
        }

        const app_ids = userAppData.data.map((row) => row.application_id);
        const user_ids = userAppData.data.map((row) => row.user_id);
        const profile_ids = userAppData.data.map((row) => row.profile_id);

        const appData = await supabase.from('applications').select("*").in('id', app_ids);
        const userData = await supabase.from('users').select("*").in('id', user_ids);

        let profileData = null;

        const nonNullProfileIds = profile_ids.filter((id) => id !== null);
        if (nonNullProfileIds.length > 0) {
            profileData = await supabase.from('profiles').select("*").in('id', nonNullProfileIds);
        }
        if (appData.error || userData.error) {
            return res.status(404).json({ message: "Internal Server Error" });
        }

        const response = userAppData.data.map((userApp) => {
            const application = appData.data.find((app) => app.id === userApp.application_id);
            const user = userData.data.find((u) => u.id === userApp.user_id);

            const profile = profileData
                ? profileData.data.find((p) => p.id === userApp.profile_id)
                : null;

            return {
                application_data: application,
                user_data: user,
                profile_data: profile,
                status: userApp.status,
            };
        });

        return res.json(response);
    } catch (error) {
        return res.status(404).json({ message: "Internal Server Error", error: error.message });
    }
});


router.route("/change-status/:id").put(isRecruiter , async(req:Request , res:Response)=>{
    const {id} = req.params
    const details = req.query.app_id
    const {statusValue} = req.body
    

    const app_id= details.toString().split("?")[0]
    const user_id = details.toString().split("?")[1].split("=")[1]

    if(!app_id || !user_id){
        return res.status(404).json("Incomplete Details")
    }

    try {
        const {data , error} = await supabase.from("userapplications").update({
            status : statusValue
        }).eq('application_id', app_id).eq('user_id', user_id)

        if(error){
            return res.status(404).json({ message: "Internal Server Error", error: error.message })
        }
        return res.json("Status updated successfully")
    } catch (error) {
        return res.status(404).json({ message: "Internal Server Error", error: error.message })        
    }

})






export default router
