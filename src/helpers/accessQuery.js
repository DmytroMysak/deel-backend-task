const { profileType } = require('../constants/profile.constant');

function accessQuery(profile) {
  if (profile?.type === profileType.client) {
    return { ClientId: profile.id };
  }
  if (profile?.type === profileType.contractor) {
    return { ContractorId: profile.id };
  }
  throw new Error('Invalid profile type in db');
}

module.exports = {
  accessQuery,
};
