import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { SECRECT_KEY } from "../config/config.js"

export const companyAuthRequired = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies
    if (!token) return res.status(200).json({ message: "Acceso denegado por falta de token" })

    jwt.verify(token, SECRECT_KEY, (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) return res.status(200).json({ message: "Acceso denegado, token invalido" })
    })
    next()
}