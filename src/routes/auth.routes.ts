import { Router } from "express";
import { loginController, logoutController, registerController, verifyAccessController } from "../controller/auth.controller.js";
import multer from "multer";

const upload = multer({dest:"uploads/"})
const router = Router()
//
router.post("/login", loginController)
router.post("/register", upload.single("company_logo"), registerController)
router.post("/logout", logoutController)
router.get("/verify-access", verifyAccessController)
//
export default router;