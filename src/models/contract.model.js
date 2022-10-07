const Sequelize = require('sequelize');
const jobConstant = require('../constants/job.constant');

module.exports = function init(sequelize) {
  class Contract extends Sequelize.Model {}
  Contract.init(
    {
      terms: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(...Object.values(jobConstant.contractStatus)),
      },
    },
    {
      sequelize,
      modelName: 'Contract',
    },
  );

  return Contract;
};
