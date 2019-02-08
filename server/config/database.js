const mongoose = require('mongoose');
const dburl = require('./index.js').secretModule.dburl;

mongoose.Promise = global.Promise;

 mongoose.connect(dburl, {useNewUrlParser: true}, function(err) {
  if (err) console.log(err);
  else console.log('Successfully connected to database');
});
