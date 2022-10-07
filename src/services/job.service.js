const { Op } = require('sequelize');
const {
  Job, Contract, Profile, sequelize,
} = require('../models');
const { accessQuery } = require('../helpers/accessQuery');
const logger = require('../helpers/logger');
const { getValidJobForPayment } = require('../helpers/job.helper');
const { profileType } = require('../constants/profile.constant');
const { contractStatus } = require('../constants/job.constant');

async function getJobs(paid, profile) {
  return Job.findAll({
    include: {
      model: Contract,
      where: {
        status: { [Op.ne]: contractStatus.terminated },
        ...accessQuery(profile),
      },
      attributes: [],
    },
    where: { paid },
  });
}

async function payForJob(jobId, profile) {
  if (profile.type !== profileType.client) {
    throw new Error('Only client can pay for job');
  }
  const validJob = await getValidJobForPayment(jobId, profile);
  const transaction = await sequelize.transaction();

  try {
    await Promise.all([
      Profile.update(
        { balance: sequelize.literal(`balance - ${validJob.price}`) },
        { where: { id: validJob.Contract.ClientId }, transaction },
      ),
      Profile.update(
        { balance: sequelize.literal(`balance + ${validJob.price}`) },
        { where: { id: validJob.Contract.ContractorId }, transaction },
      ),
      Job.update(
        { paid: true, paymentDate: Date.now() },
        { where: { id: validJob.id }, transaction },
      ),
    ]);

    // TODO: check why no return from update
    const client = await Profile.findByPk(validJob.Contract.ClientId);
    if (client.balance < 0) {
      throw new Error('You don\'t have enough money:)');
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    logger.error(error, `transaction unsuccessful. jobId: ${jobId}, profileId: ${profile.id}`);
    throw error;
  }
}

module.exports = {
  payForJob,
  getJobs,
};
