const { Profile } = require('../models');

const getProfileMiddleware = async (req, res, next) => {
  req.profile = await Profile.findOne({ where: { id: req.get('profile_id') ?? 0 } });
  if (!req.profile) {
    return res.status(401).end();
  }
  return next();
};

module.exports = { getProfileMiddleware };
