/**
 * Intiation Script
 *
 * 1. Creates a root folder if it does not exist
 * 2. Creates a notebook note if it does not exist
 * 3. Create admin
 */

const mongoose = require('mongoose');
const dburl = require('../secret.js').dburl;
const readline = require('readline');
const _ = require('lodash');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

mongoose.Promise = global.Promise;

function warning (){
  _.times(5, function(){
    console.log("***Warning*** Creating root account");
  })
}

function handleError(err){
  console.log(err);
  process.exit();
}

async main() {
  try {
    const promise = await mongoose.connect(dburl, {
      useMongoClient: true
    });

    console.log('Successfully connected to database');

    require('../models/userModel');
    const User = mongoose.model('User');

    require('../models/gateModel')
    const Gate = mongoose.model('Gate');

    const root = await Gate.findOne({_id: '000000000000000000000000'}).exec();
    if ( !root ) {
      const newRoot = new Gate({
        _id: '000000000000000000000000',
        type: 'folder',
        ancestor: [],
        ind: 0,
        title: 'Root'
      });
      await newRoot.save();
    }

    warning();
    const email = await new Promise(function(resolve, reject) {
      rl.question('Enter email for admin: ', function(email){
        return resolve(email);
      });
    });

    const password = await new Promise(function(resolve, reject) {
      rl.question('Enter password for admin: ', function(password) {
        return resolve(password);
      })
    });

    const pass = User.createHash(password);
    const user = new User({
      email,
      password: pass,
      status: 'root',
      verified: 'true'
    });
    await user.save();

  } catch (err) {
    handleError(err);
  }
}