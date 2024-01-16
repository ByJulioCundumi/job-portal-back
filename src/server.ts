import cookieParser from "cookie-parser"
import express, { Request, Response } from "express"
import morgan from "morgan"
import authRoutes from "./routes/auth.routes.js"
import jobRoutes from "./routes/job.routes.js"

//app
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan("dev"))

//routes
app.get("/", (req:Request, res:Response)=>{return res.status(200).json({message:"The server is alive"})})
app.use("/api", authRoutes)
app.use("/api", jobRoutes)

//
export default app;