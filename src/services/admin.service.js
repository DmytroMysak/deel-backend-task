const { Op } = require('sequelize');
const { first } = require('lodash');
const {
  Contract, Job, Profile, sequelize,
} = require('../models');

async function findBestProfession({ start, end }) {
  const res = await Job.findAll({
    include: {
      model: Contract,
      attributes: ['ContractorId'],
      include: {
        model: Profile,
        attributes: ['profession'],
        as: 'Contractor',
      },
    },
    attributes: [[sequelize.fn('sum', sequelize.col('price')), 'paid']],
    group: 'Contract.ContractorId',
    where: { paymentDate: { [Op.gte]: start, [Op.lte]: end } },
    order: [['paid', 'DESC']],
    limit: 1,
  });

  return first(res)?.Contract?.Contractor?.profession;
}

async function findBestClients({ start, end, limit }) {
  const res = await Job.findAll({
    include: {
      model: Contract,
      attributes: ['ClientId'],
      include: {
        model: Profile,
        as: 'Client',
      },
    },
    attributes: [[sequelize.fn('sum', sequelize.col('price')), 'paid']],
    group: 'Contract.ClientId',
    where: { paymentDate: { [Op.gte]: start, [Op.lte]: end } },
    order: [['paid', 'DESC']],
    limit,
  });

  return res.map((el) => ({
    id: el?.Contract?.Client.id,
    fullName: el?.Contract?.Client.fullName,
    paid: el?.paid,
  }));
}

module.exports = {
  findBestProfession,
  findBestClients,
};
