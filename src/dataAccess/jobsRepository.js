import { Job, Contract } from "../models/index.js";

function getAllJobs() {
  return Job.findAll({});
}

function removeJob(id) {
  return Job.destroy({
    where: { id: id },
  });
}

function findUnpaidJob(id) {
  return Job.findOne({
    where: { id: id, paid: null },
    include: {
      model: Contract,
    },
  });
}

export { getAllJobs, removeJob, findUnpaidJob };
