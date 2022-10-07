const express = require('express');
const jobService = require('../services/job.service');

const router = express.Router();

router.get('/unpaid', async (req, res) => {
  try {
    const contracts = await jobService.getJobs(null, req.profile);

    return res.json(contracts);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.post('/:job_id/pay', async (req, res) => {
  try {
    const { job_id: jobId } = req.params;

    await jobService.payForJob(jobId, req.profile);

    return res.status(201).end();
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
