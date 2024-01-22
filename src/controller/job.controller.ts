import { Request, Response } from "express"
import { Job } from "../model/job.model.js";
import { cloudinaryRemoveImage, cloudinaryUploadImage } from "../util/cloudinary.js";
import { IJobPost } from "../interfaces/IJob.js";
import jwt from "jsonwebtoken"
import { SECRECT_KEY } from "../config/config.js";
import fs from "fs"
import { User } from "../model/user.model.js";
import { AppDataSource } from "../db/db.js";

export const getJobController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const found = await Job.findOneBy({ id: parseInt(id) })
        if (!found?.id) return res.status(404).json({ message: "Trabajo no encontrado" })
        return res.status(200).json(found)
    } catch (error) {
        console.log(error)
    }
}

export const getJobsController = async (req: Request, res: Response) => {
    const { token } = req.cookies
    const userRepo = AppDataSource.getRepository(User)
    try {
        jwt.verify(token, SECRECT_KEY, async (err: jwt.VerifyErrors | null, decoded: any) => {
            const user = await userRepo.findOne({
                where: {
                    id: decoded.id,
                },
                relations: {
                    jobs: true,
                },
            })
            return res.status(200).json(user?.jobs)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllJobsController = async (req: Request, res: Response) => {
    const { token } = req.cookies
    const jobRepo = AppDataSource.getRepository(Job)
    try {
        jwt.verify(token, SECRECT_KEY, async (err: jwt.VerifyErrors | null, decoded: any) => {
            const jobs = await jobRepo.find({
                relations: {
                    user: true,
                },
            })
            console.log(jobs)
            return res.status(200).json(jobs)
        })
    } catch (error) {
        console.log(error)
    }
}

export const postJobController = async (req: Request, res: Response) => {
    const body: IJobPost = req.body;
    console.log(body)
    const { token } = req.cookies
    try {
        jwt.verify(token, SECRECT_KEY, async (err: jwt.VerifyErrors | null, decoded: any) => {
            const job = new Job()
            job.title = body.title;
            job.location = body.location;
            job.experience = body.experience;
            job.modality = body.modality;
            job.salary = body.salary;
            job.type = body.type;
            job.description = body.description;
            job.user = decoded;

            const result = await job.save()
            console.log(result)
            if (!result.id) return res.status(500).json({ message: "No se pudo crear el nuevo trabajo" })
            return res.status(200).json(result)
        })
    } catch (error) {
        console.log(error)
    }
}

export const putJobController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body: IJobPost = req.body;

    try {
        const found = await Job.findOneBy({ id: parseInt(id) })
        if (!found?.id) return res.status(404).json({ message: "Trabajo no encontrado" })
        //
        found.title = body.title;
        found.location = body.location;
        found.experience = body.experience;
        found.modality = body.modality;
        found.salary = body.salary;
        found.type = body.type;
        found.description = body.description;

        const result = await found.save()
        if (!result.id) return res.status(500).json({ message: "No se pudo actualizar el nuevo trabajo" })
        //
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

export const deleteJobController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const found = await Job.findOneBy({ id: parseInt(id) })
        if (!found?.id) return res.status(404).json({ message: "Trabajo no encontrado" })
        //
        const result = await Job.delete(id)
        if (!(result.affected != 0)) return res.status(500).json({ message: "No se logro eliminar el trabajo" })
        console.log(result)
        return res.sendStatus(200).end()
    } catch (error) {
        console.log(error)
    }
}