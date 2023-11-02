import { Router } from "express";
import {
  getAllJobsHandler,
  deleteJobHandler,
  payJobHandler,
} from "../../controllers/jobsController.js";

const router = Router();

router.get("/jobs", getAllJobsHandler);
router.delete("/jobs/:id", deleteJobHandler);
router.post("/jobs/:id/pay", payJobHandler);

export default router;
