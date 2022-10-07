const express = require('express');
const balanceService = require('../services/balance.service');
const { validateDepositAmountMiddleware } = require('../middleware/balance.middleware');

const router = express.Router();

router.post('/deposit/:userId', validateDepositAmountMiddleware, async (req, res) => {
  const { userId } = req.params;
  const { depositAmount } = req.body;

  try {
    await balanceService.depositClient(userId, depositAmount);

    return res.status(201).end();
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
