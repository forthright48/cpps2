const express = require('express');
const router = express.Router();
const {isEmpty} = require('lodash');
const {isAdmin} = require('middlewares/userGroup');

const User = require('../../models/userModel');

router.get('/admin/users', getUsers);
router.get('/admin/admins', getAdmins);
router.get('/admin/coaches', getCoaches);

module.exports = {
  addRouter(app) {
    app.use('/api/v1', isAdmin, router);
  },
};

async function getUserList(filter = {}, skip, limit) {
  const users = await User.find(filter, {ojStats: 0}).skip(skip).limit(limit).exec();
  const santizedUsers = users.map((e) => {
    e.password = undefined;
    return e;
  });
  return santizedUsers;
}

async function userListRequestHandler(filter = {}, req, res, next) {
  try {
    let skip = isEmpty(req.query.skip) ? 0 : parseInt(req.query.skip);
    let limit = isEmpty(req.query.limit) ? 10 : parseInt(req.query.limit);
    let reqFilter = isEmpty(req.query.filter) ? {} : JSON.parse(req.query.filter);
    const users = await getUserList({...filter, ...reqFilter}, skip, limit);
    return res.status(200).json({
      users,
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
}

async function getUsers(req, res, next) {
  return userListRequestHandler({}, req, res, next);
}

async function getAdmins(req, res, next) {
  return userListRequestHandler({roles: 'admin'}, req, res, next);
}

async function getCoaches(req, res, next) {
  return userListRequestHandler({roles: 'coach'}, req, res, next);
}
