module.exports = {
  secretModule: require('../secret.js'),
  port: process.env.PORT || 5000,
  database: {
    init() {
      require('./database.js');
    },
  },
  session: {
    init(app) {
      require('./session.js').addSession(app);
    },
  },
};
