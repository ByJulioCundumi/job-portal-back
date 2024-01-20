import { Router } from "express";
import { loginController, logoutController, registerController, verifyAccessController } from "../controller/auth.controller.js";

const router = Router()
//
router.post("/login", loginController)
router.post("/register", registerController)
router.post("/logout", logoutController)
router.get("/verify-access", verifyAccessController)
//
export default router;