import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { getAllJobs, removeJob } from "../dataAccess/jobsRepository.js";
import payJob from "../services/jobPaymentService.js";

const getAllJobsHandler = asyncHandler(async (req, res, next) => {
  const jobs = await getAllJobs();
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
});

const deleteJobHandler = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const deletedRecord = await removeJob(id);
  res.status(StatusCodes.OK).json({ message: "Job deleted successfully" });
});

const payJobHandler = asyncHandler(async (req, res, next) => {
  const jobId = req.params.id;
  const paidJob = await payJob(jobId);
  return res.status(StatusCodes.OK).json(paidJob);
});

export { getAllJobsHandler, deleteJobHandler, payJobHandler };
