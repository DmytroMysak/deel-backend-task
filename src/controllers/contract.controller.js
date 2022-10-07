const express = require('express');
const contractService = require('../services/contract.service');
const jobConstant = require('../constants/job.constant');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const contract = await contractService.getContractById(id, req.profile);
  if (!contract) {
    return res.status(404).end();
  }
  return res.json(contract);
});

router.get('/', async (req, res) => {
  const { contractStatus } = jobConstant;
  const contracts = await contractService.getContracts([
    contractStatus.inProgress,
    contractStatus.new,
  ], req.profile);

  return res.json(contracts);
});

module.exports = router;
