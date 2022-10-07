const { first } = require('lodash');
const {
  Contract, Job, Profile, sequelize,
} = require('../models');
const { contractStatus } = require('../constants/job.constant');

async function depositClient(userId, depositAmount) {
  const res = await Job.findAll({
    include: {
      model: Contract,
      where: { status: contractStatus.inProgress, ClientId: userId },
      attributes: [],
    },
    attributes: [[sequelize.fn('sum', sequelize.col('price')), 'allPriceToPay']],
    where: { paid: null },
  });

  const { allPriceToPay } = first(res)?.toJSON() ?? {};
  if (!allPriceToPay || allPriceToPay * 0.25 < depositAmount) {
    throw new Error('You can\'t deposit money');
  }

  await Profile.update(
    { balance: sequelize.literal(`balance + ${depositAmount}`) },
    { where: { id: userId } },
  );
}

module.exports = {
  depositClient,
};
