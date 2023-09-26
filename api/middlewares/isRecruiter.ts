import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { isAuthenticated } from "./isAuthenticated";
import { supabase } from "../config/db";

interface TokenType {
    id: string
}

export const isRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, (err) => {
        if (err) {
            return res.status(403).json({ message: "Unauthorized" })
        }
    })

    const { id } = req.params
    const {data , error} = await supabase.from("users").select("*").eq('id' , id)

    if(error){
        return res.status(404).json({message : "Internal server error"})
    }

    if(data[0]?.role != 'recruiter'){
        return res.status(401).json({message : "Unauthorized"})
    }
    else{
        next()
    }






}