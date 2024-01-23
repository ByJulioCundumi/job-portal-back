import { Request, Response } from "express"
import { IUser } from "../interfaces/IUser"
import { User } from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { SECRECT_KEY } from "../config/config.js"
import { cloudinaryUploadImage } from "../util/cloudinary.js"
import fs from "fs"

export const registerController = async (req: Request, res: Response) => {
    const userBody = req.body
    const img = req.file;
    try {
        const userFound = await User.findOneBy({ email: userBody.email })
        if (!!userFound?.id) return res.status(200).json({ message: "El email registrado ya existe" })
        //
        const user = new User()
        if (!img?.path) {
            user.firstname = userBody.firstname;
            user.email = userBody.email;
            user.img = {url:"", id:""}
            user.password = await bcrypt.hash(userBody.password, 10);
            user.role = userBody.role;
        } else{
            const newImg = await cloudinaryUploadImage(img.path)
            user.firstname = userBody.firstname;
            user.img = {url:newImg.url, id:newImg.public_id}
            user.email = userBody.email;
            user.password = await bcrypt.hash(userBody.password, 10);
            user.role = userBody.role;
            await fs.unlinkSync(img.path)
        }
        //
        const result = await user.save()
        if (!result.id) return res.status(200).json({ message: "Error al registrar el nuevo usuario" })

        const token = {
            id: result.id,
            img: {url: result.img.url, id:result.img.id},
            firstname: result.firstname,
            email: result.email,
            role: result.role
        }

        jwt.sign(token, SECRECT_KEY, { expiresIn: "1d" }, (error, token) => {
            if (error) return res.status(200).json({ message: "Error al crear el token de acceso" })
            //
            res.cookie("token", token)
            return res.status(201).json({
                id: result.id,
                img: {url: result.img.url, id:result.img.id},
                firstname: result.firstname,
                email: result.email,
                role: result.role
            } as IUser)
        })
    } catch (error) {
        console.log(error)
    }
}

export const loginController = async (req: Request, res: Response) => {
    const userBody = req.body as IUser

    try {
        const userFound = await User.findOneBy({ email: userBody.email })
        if (!userFound?.id) return res.status(200).json({ message: "Usuario no encontrado" })
        //
        const token = {
            id: userFound.id,
            img: {url: userFound.img.url, id:userFound.img.id},
            firstname: userFound.firstname,
            email: userFound.email,
            role: userFound.role,
            jobs: userFound.jobs
        }
        //
        jwt.sign(token, SECRECT_KEY, { expiresIn: "1d" }, (error, token) => {
            if (error) return res.status(200).json({ message: "Error al crear el token de acceso" })
            //
            res.cookie("token", token)
            return res.status(200).json({
                id: userFound.id,
                img: {url: userFound.img.url, id:userFound.img.id},
                firstname: userFound.firstname,
                email: userFound.email,
                role: userFound.role,
                jobs: userFound.jobs
            })
        })
    } catch (error) {
        console.log(error)
    }
}

export const logoutController = async (req: Request, res: Response) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.status(204).end()
}

export const verifyAccessController = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    if (!token) return res.status(200).json({ message: "Acceso denegado, token inexistente" })
    //
    jwt.verify(token, SECRECT_KEY, async (error: jwt.VerifyErrors | null, decoded: any) => {
        if (error) return res.status(200).json({ message: "Acceso denegago, token invalido" })
        //
        try {
            const result = await User.findOneBy({ id: decoded.id })
            if (!result?.id) return res.status(200).json({ message: "Usuario no encontrado" })
            //
            return res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    })
}