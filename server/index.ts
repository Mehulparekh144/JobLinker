import express, { Express } from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import cors from 'cors'
import { supabase } from './config/db'
import user from './routes/userRoutes'
dotenv.config()

const app: Express = express()
app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.0.102:5173"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
dotenv.config()

app.listen(8000, () => (
    console.log("Server up on 8000")
))

app.use("/api/user", user)

