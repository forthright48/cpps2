process.on('unhandledRejection', (error) => {
  console.error('Unhandled Exception. Stack Trace:\n', error.stack);
  process.exit(2);
});

process.on('uncaughtException', function(error) {
  console.error('Uncaught Exception. Stack Trace:\n', error.stack);
  process.exit(2);
});


// Setup environment variables
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const express = require('express');
const config = require('config');
const logger = require('logger');
const morgan = require('morgan');

const app = express();
const server = require('http').createServer(app);
app.set('port', config.port);

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({
  extended: true,
})); // support encoded bodies

config.database.init();
config.session.init(app);

/* Middlewares */
app.use(morgan('dev'));

/* API Public*/

require('./api/public/auth.js').addRouter(app);

require('./api/v1/users.js').addRouter(app);
require('./api/v1/ojInfo.js').addRouter(app);
require('./api/v1/gateway.js').addRouter(app);
require('./api/v1/problemBank.js').addRouter(app);
require('./api/v1/classrooms.js').addRouter(app);
require('./api/v1/problemList.js').addRouter(app);
require('./api/v1/contests.js').addRouter(app);
require('./api/v1/standings.js').addRouter(app);
require('./api/v1/ratings.js').addRouter(app);

/* Error Handling */
app.use('/api/', function(err, req, res, next) {
  if (process.env.NODE_ENV === 'dev') {
     console.log(err);
  }
  const status = err.status || 500;
  if ( status == 500 ) {
    logger.error(err.stack);
  }
  return res.status(status).json({
    status,
    message: err.message,
    error: process.env.NODE_ENV === 'dev'? err : undefined,
  });
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
