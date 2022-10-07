const express = require('express');
const bodyParser = require('body-parser');
const pinoHttp = require('pino-http');
const logger = require('./helpers/logger');
const { getProfileMiddleware } = require('./middleware/getProfile.middleware');
const contractController = require('./controllers/contract.controller');
const jobController = require('./controllers/job.controller');
const balanceController = require('./controllers/balance.controller');
const adminController = require('./controllers/admin.controller');

const app = express();

app.use(pinoHttp({ logger }));
app.use(bodyParser.json());
app.use(getProfileMiddleware);

app.use('/contracts', contractController);
app.use('/jobs', jobController);
app.use('/balances', balanceController);
app.use('/admin', adminController);

module.exports = app;
