const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const logger = require('logger');

const app = express();
const server = require('http').createServer(app);

app.set('port', config.port);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
})); // support encoded bodies

config.database.init();
config.session.init(app);

process.on('unhandledRejection', (error) => {
  logger.error({
    severe: true,
    error: error.stack,
  });
  process.exit(1);
});

process.on('uncaughtException', function(error) {
  logger.error({
    severe: true,
    error: error.stack,
  });
  process.exit(1);
});

if (require.main === module) {
  server.listen(app.get('port'), function() {
    logger.info(`Server running at port ${app.get('port')}`);
  });
} else {
  module.exports = {
    server,
    app,
  };
}
