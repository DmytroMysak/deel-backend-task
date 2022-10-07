const express = require('express');
const adminService = require('../services/admin.service');
const { validateRangeMiddleware, validateLimitMiddleware } = require('../middleware/admin.middleware');
const { defaultLimit } = require('../constants/request.constant');

const router = express.Router();

router.get('/best-profession', validateRangeMiddleware, async (req, res) => {
  const profession = await adminService.findBestProfession(req.query);
  if (!profession) {
    return res.status(404).end();
  }
  return res.json({ bestProfession: profession });
});

router.get('/best-clients', [validateRangeMiddleware, validateLimitMiddleware], async (req, res) => {
  const limit = Number.parseInt(req.query.limit ?? defaultLimit, 10);
  const clients = await adminService.findBestClients({ ...req.query, limit });

  return res.json(clients);
});

module.exports = router;
