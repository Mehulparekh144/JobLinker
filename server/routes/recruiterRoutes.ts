import express, { Request, Response, application } from "express";
const router = express.Router()
import { supabase } from "../config/db";
import dotenv from 'dotenv'
import { isAuthenticated } from "../middlewares/isAuthenticated";
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
    if(app_id){
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
    else{
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


router.route("/application/:id").delete(isRecruiter , async (req:Request , res:Response) =>{
    const app_id = req.query.app_id
    try {
        const {data , error} = await supabase.from("applications").delete().eq('id' , app_id)
        if(error){
            return res.status(404).json({message : "Internal Server Error" , error : error.message})           
        }
        return res.json({message : "Application deleted successfully" , app_id : app_id})
    } catch (error) {
        return res.status(404).json({ message: "Internal Server Error", error: error.message })            
    }
})

router.route("/application/:id").put(isRecruiter , async (req:Request , res:Response) =>{
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
        const {data , error} = await supabase.from("applications").update(
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
        ).eq('id' , app_id).single()
        if(error){
            return res.status(404).json({message : "Internal Server Error" , error : error.message})           
        }
        return res.json({message : "Application updated successfully" , app_id : app_id , data:data})
    } catch (error) {
        return res.status(404).json({ message: "Internal Server Error", error: error.message })            
    }
})



export default router
