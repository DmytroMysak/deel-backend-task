const { isDate, isInteger } = require('lodash');
const { defaultLimit } = require('../constants/request.constant');

function validateRangeMiddleware(req, res, next) {
  const { start, end } = req.query;

  if (!isDate(new Date(start)) || !isDate(new Date(end))) {
    return res.status(400).send('Invalid date range');
  }
  if (new Date(start) > new Date(end)) {
    return res.status(400).send('Invalid date range');
  }

  return next();
}

function validateLimitMiddleware(req, res, next) {
  const { limit = defaultLimit } = req.query;
  const number = Number.parseInt(limit, 10);

  if (!isInteger(number) || number <= 0) {
    return res.status(400).send('Invalid limit');
  }

  return next();
}

module.exports = {
  validateRangeMiddleware,
  validateLimitMiddleware,
};
