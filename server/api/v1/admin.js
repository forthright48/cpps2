const express = require('express');
const router = express.Router();
const {isEmpty} = require('lodash');

const User = require('../../models/userModel');

router.get('/admin/users', getUserList);
router.get('/admin/admins', getAdminList);

module.exports = {
  addRouter(app) {
    app.use('/api/v1', router);
  },
};

async function getUserList(req, res, next) {
  try {
    let skip = isEmpty(req.query.skip) ? 0 : parseInt(req.query.skip);
    let limit = isEmpty(req.query.limit) ? 10 : parseInt(req.query.limit);
    const s = req.session;
    if (!s.roles.includes('root')) {
      return res.status(400).json({
        status: 400,
      });
    }
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
    const s = req.session;
    if (!s.roles.includes('root')) {
      return res.status(400).json({
        status: 400,
      });
    }
    const users = await User.find({
      roles: 'root',
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
