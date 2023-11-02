import { findUnpaidJob } from "../dataAccess/jobsRepository.js";
import { findUser } from "../dataAccess/usersRepository.js";
import { sequelize } from "../models/index.js";

async function payJob(jobId) {
  const unpaidJob = await findUnpaidJob(jobId);

  if (!unpaidJob) {
    throw new Error("Job not found");
  }

  const client = await findUser(unpaidJob.Contract.ClientId);

  if (client.balance >= unpaidJob.price) {
    const contractor = await findUser(unpaidJob.Contract.ContractorId);

    const transaction = await sequelize.transaction();
    try {
      contractor.balance = contractor.balance + unpaidJob.price;
      await contractor.save({ transaction });

      client.balance = client.balance - unpaidJob.price;
      await client.save({ transaction });

      unpaidJob.paid = true;
      unpaidJob.paymentDate = new Date();
      await unpaidJob.save({ transaction });

      await transaction.commit();

      return { job: unpaidJob };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  throw new Error("Invalid balance");
}

export default payJob;
