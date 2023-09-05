import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

interface TokenType {
    id: number
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies
    const { id } = req.params
    
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, {}, async (err, userData: TokenType) => {
            if (err) {
                return res.status(404).json({ err })
            }
            else {
                if(Number(id) === userData.id){
                    next()
                }
                else{
                    return res.status(403).json({message : "Wrong id"})
                }
            }
        })
    }
    else {
        return res.status(401).json({ message: "Unauthorized" })
    }





}