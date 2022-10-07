const config = require('./config');
const app = require('./app');
const logger = require('./helpers/logger');

(async function main() {
  try {
    app.listen(config.port, () => {
      logger.info(`Express App Listening on Port ${config.port}`);
    });
  } catch (error) {
    logger.error(error, 'An error occurred during application start. Stopping application.');
    process.exit(1);
  }
}());
