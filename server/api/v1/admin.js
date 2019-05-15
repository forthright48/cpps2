const express = require('express');
const router = express.Router();
const {isEmpty} = require('lodash');
const {isAdmin} = require('middlewares/userGroup');

const User = require('../../models/userModel');

router.get('/admin/users', getUserList);
router.get('/admin/admins', getAdminList);
router.get('/admin/coaches', getCoachList);

module.exports = {
  addRouter(app) {
    app.use('/api/v1', isAdmin, router);
  },
};

async function getUserList(req, res, next) {
  try {
    let skip = isEmpty(req.query.skip) ? 0 : parseInt(req.query.skip);
    let limit = isEmpty(req.query.limit) ? 10 : parseInt(req.query.limit);
    const users = await User.find({}, {ojStats: 0}).skip(skip).limit(limit).exec();
    const santizedUsers = users.map((e) => {
      e.password = undefined;
      return e;
    });
    return res.status(200).json({
      users: santizedUsers,
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
}

async function getAdminList(req, res, next) {
  try {
    let skip = isEmpty(req.query.skip) ? 0 : parseInt(req.query.skip);
    let limit = isEmpty(req.query.limit) ? 10 : parseInt(req.query.limit);
    const users = await User.find({
      roles: 'admin',
    }, {ojStats: 0}).skip(skip).limit(limit).exec();
    const santizedUsers = users.map((e) => {
      e.password = undefined;
      return e;
    });
    return res.status(200).json({
      users: santizedUsers,
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
}

async function getCoachList(req, res, next) {
  try {
    let skip = isEmpty(req.query.skip) ? 0 : parseInt(req.query.skip);
    let limit = isEmpty(req.query.limit) ? 10 : parseInt(req.query.limit);
    const users = await User.find({
      roles: 'coach',
    }, {ojStats: 0}).skip(skip).limit(limit).exec();
    const santizedUsers = users.map((e) => {
      e.password = undefined;
      return e;
    });
    return res.status(200).json({
      users: santizedUsers,
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
}
