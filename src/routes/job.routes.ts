import { Router } from "express";
import { deleteJobController, getAllJobsController, getJobController, getJobsController, postJobController, putJobController } from "../controller/job.controller.js";
import { companyAuthRequired } from "../middleware/auth.middleware.js";

const router = Router()
//
router.get("/job/:id", companyAuthRequired, getJobController)
router.get("/job", companyAuthRequired, getJobsController)
router.get("/all-job", getAllJobsController)
router.post("/job", companyAuthRequired, postJobController)
router.put("/job/:id", companyAuthRequired, putJobController)
router.delete("/job/:id", deleteJobController)
//
export default router;