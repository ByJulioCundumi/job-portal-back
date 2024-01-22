import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRECT } from "../config/config.js";

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRECT,
    secure: true
})

export const cloudinaryUploadImage = async (path:string)=>{
    return await cloudinary.uploader.upload(path, {
        folder: "job-portal"
    })
}

export const cloudinaryRemoveImage = async (id:string)=>{
    await cloudinary.uploader.destroy(id)
}