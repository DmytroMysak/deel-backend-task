const { Contract } = require('../models');
const { accessQuery } = require('../helpers/accessQuery');

async function getContractById(contractId, profile) {
  return Contract.findOne({
    where: {
      id: contractId,
      ...accessQuery(profile),
    },
  });
}

async function getContracts(status, profile) {
  return Contract.findAll({
    where: {
      status,
      ...accessQuery(profile),
    },
  });
}

module.exports = {
  getContractById,
  getContracts,
};
