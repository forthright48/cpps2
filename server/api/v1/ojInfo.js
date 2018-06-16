const express = require('express');
const router = express.Router();
const ojInfo = require('models').ojInfo;

router.get('/ojInfo', getInfo);

module.exports = {
  addRouter(app) {
    app.use('/api/v1', router);
  },
};

function getInfo(req, res, next) {
  return res.status(200).json({
    status: 200,
    data: ojInfo.data,
  });
}
