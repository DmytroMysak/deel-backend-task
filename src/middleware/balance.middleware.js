const { isNumber, isFinite } = require('lodash');

function validateDepositAmountMiddleware(req, res, next) {
  const { depositAmount } = req.body;

  if (!isNumber(depositAmount) || !isFinite(depositAmount) || depositAmount <= 0) {
    return res.status(400).send('Invalid depositAmount');
  }

  return next();
}

module.exports = {
  validateDepositAmountMiddleware,
};
