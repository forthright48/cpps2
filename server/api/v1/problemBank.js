const express = require('express');
const ProblemBank = require('../../models/problemBankModel');
const ojscraper = require('ojscraper');

const router = express.Router();

router.get('/problemBank/:platform/:problemId', getProblem);

module.exports = {
  addRouter(app) {
    app.use('/api/v1', router);
  },
};

async function getProblem(req, res, next) {
  const {platform, problemId} = req.params;

  try {
    const problem = await ProblemBank.findOne({
      platform,
      problemId,
    }).exec();

    // Problem found in bank
    if (problem) {
      return res.status(200).json({
        status: 200,
        data: problem,
      });
    }

    const credential = require('config').secretModule.ojscraper.loj.credential;
    const info = await ojscraper.getProblemInfo({
      ojname: platform, problemID: problemId, credential,
    });

    const newProblem = new ProblemBank({
      title: info.title,
      problemId: info.problemID,
      platform: info.platform,
      link: info.link,
    });
    const savedProblem = await newProblem.save();

    return res.status(200).json({
      status: 200,
      data: savedProblem,
    });
  } catch (err) {
    return next(err);
  }
}
