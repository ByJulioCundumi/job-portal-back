import { Router } from "express";
import { deleteJobController, getJobController, getJobsController, postJobController, putJobController } from "../controller/job.controller.js";

const router = Router()
//
router.get("job/id", getJobController)
router.get("job", getJobsController)
router.post("job", postJobController)
router.put("job", putJobController)
router.delete("job", deleteJobController)
//
export default router;