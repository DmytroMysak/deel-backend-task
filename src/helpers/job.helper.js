const { Job, Contract } = require('../models');
const { accessQuery } = require('./accessQuery');
const { contractStatus } = require('../constants/job.constant');

async function getValidJobForPayment(jobId, profile) {
  const job = await Job.findOne({
    include: {
      model: Contract,
      where: { status: contractStatus.inProgress, ...accessQuery(profile) },
      attributes: ['ContractorId', 'ClientId'],
    },
    attributes: ['price', 'id'],
    where: { paid: null, id: jobId },
  });

  if (!job) {
    throw new Error('Job not found or already paid.');
  }
  // validate once more in transaction
  if (job.price > profile.balance) {
    throw new Error('You don\'t have enough money:)');
  }
  return job.toJSON();
}

module.exports = {
  getValidJobForPayment,
};
