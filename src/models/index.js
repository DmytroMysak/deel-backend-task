/* eslint-disable max-classes-per-file */
const Sequelize = require('sequelize');
const config = require('../config/index');
const initContractModel = require('./contract.model');
const initJobModel = require('./job.model');
const initProfileModel = require('./profile.model');

const sequelize = new Sequelize(config.dbConfig);

const Contract = initContractModel(sequelize);
const Job = initJobModel(sequelize);
const Profile = initProfileModel(sequelize);

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
Job.belongsTo(Contract);

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job,
};
