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
  output: process.stdout,
});

mongoose.Promise = global.Promise;

function warning() {
  _.times(5, function() {
    console.log('***Warning*** Creating root account');
  });
}

function handleError(err) {
  console.log(err);
  process.exit();
}

async function main() {
  try {
    await mongoose.connect(dburl);

    console.log('Successfully connected to database');

    require('../models/userModel');
    const User = mongoose.model('User');

    require('../models/gateModel');
    const Gate = mongoose.model('Gate');

    const root = await Gate.findOne({_id: process.env.GATEWAY_ROOT}).exec();
    if ( !root ) {
      const newRoot = new Gate({
        _id: process.env.GATEWAY_ROOT,
        type: 'folder',
        ancestor: [],
        ind: 0,
        title: 'Root',
      });
      await newRoot.save();
    }

    warning();

    const username = await new Promise(function(resolve, reject) {
      rl.question('Enter username for admin: ', function(username) {
        return resolve(username);
      });
    });

    const email = await new Promise(function(resolve, reject) {
      rl.question('Enter email for admin: ', function(email) {
        return resolve(email);
      });
    });

    const password = await new Promise(function(resolve, reject) {
      rl.question('Enter password for admin: ', function(password) {
        return resolve(password);
      });
    });

    const pass = await User.createHash(password);
    const user = new User({
      _id: username,
      email,
      password: pass,
      roles: ['root', 'user'],
      emailVerified: true,
    });
    await user.save();

    console.log('Done');
  } catch (err) {
    handleError(err);
  }
}

main();
