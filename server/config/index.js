module.exports = {
  secretModule: require('../secret.js'),
  port: process.env.PORT || 8002,
  database: {
    init() {
      require('./database.js');
    }
  },
  session: {
    init(app) {
      require('./session.js').addSession(app);
    }
  }
};
