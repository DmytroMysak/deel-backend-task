require('dotenv').config();

const { merge } = require('lodash');
const development = require('./development');
const production = require('./production');

const config = {
  development,
  production,
};
const envConfig = config[process.env.NODE_ENV || 'development'];
if (!envConfig) {
  throw new Error('Application started with invalid environment');
}

const defaultConfig = {
  port: process.env.PORT || 3001,
  dbConfig: {
    dialect: 'sqlite',
    storage: './database.sqlite3',
  },
};

module.exports = merge(defaultConfig, envConfig);
