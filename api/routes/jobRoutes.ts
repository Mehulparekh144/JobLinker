import express, { Request, Response } from "express";
const router = express.Router()
import { supabase } from "../config/db";
import dotenv from 'dotenv'
dotenv.config()

router.route("/application").get(async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase.from("applications").select("*")
        if (error) {
            res.status(404).json({ message: "Internal server error", error: error })
        }
        return res.json(data)
    } catch (error) {
        res.status(404).json({ message: "Internal server error", error: error })

    }
})

router.route("/application/:id").get(async (req:Request , res : Response)=>{
    const { id } = req.params
    try {
        const { data, error } = await supabase.from("applications").select("*").eq('id', id).single()
        if (error) {
            return res.status(404).json({ message: "Internal server error", err: error.message })
        }
        const recruiterId = await supabase.from("users").select("*").eq('id' , data.recruiter).single()
        return res.json({...data , recruiter_name : recruiterId.data.name , recruiter_email : recruiterId.data.email })
    }
    catch (error) {
        return res.status(404).json({ message: "Internal server error", err: error.message })

    }
})

export default router;
