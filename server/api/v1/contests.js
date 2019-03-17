const express = require('express');
const {isRoot} = require('middlewares/userGroup');
const Contest = require('../../models/contestModel');
const Standing = require('../../models/standingModel');
const Classroom = require('../../models/classroomModel');
const {isEmpty, pick} = require('lodash');

const router = express.Router();

router.get('/contests', getContests);
router.post('/contests', isRoot, insertContest);
router.put('/contests/:contestId', isRoot, updateContest);
router.delete('/contests/:contestId', isRoot, deleteContest);

module.exports = {
  addRouter(app) {
    app.use('/api/v1', router);
  },
};

async function getContests(req, res, next) {
  try {
    const {classroomId} = req.query;
    if (!classroomId) {
      const e = new Error('classroomId query is missing');
      e.status = 400;
      throw e;
    }
    const contests = await Contest.find({classroomId}).exec();
    return res.status(200).json({
      status: 200,
      data: contests,
    });
  } catch (err) {
    next(err);
  }
}

async function insertContest(req, res, next) {
  const {name, link, classroomId} = req.body;
  const {userId} = req.session;

  try {
    const classroom = await Classroom.findOne({_id: classroomId})
      .select('coach').exec();

    if (!classroom) {
      const e = new Error(`No such classroom with id ${classroom}`);
      e.status = 400;
      throw e;
    }

    if ( classroom.coach.toString() !== userId.toString() ) {
      const e = new Error(`You are not the owner of this classroom`);
      e.status = 400;
      throw e;
    }
  } catch (err) {
    err.message = err.message + ' Error during contest creation';
    err.status = 500;
    err.type = 'contest-error';
    return next(err);
  }

  const contest = new Contest({name, link, classroomId, coach: userId});
  try {
    await contest.save();
    return res.status(201).json({
      status: 201,
      data: contest,
    });
  } catch (err) {
    err.message = err.message + ' Error during contest creation';
    err.status = 500;
    err.type = 'contest-error';
    return next(err);
  }
}


// Only allow deleting standings
async function updateContest(req, res, next) {
  const {contestId} = req.params;
  const {userId} = req.session;

  if (req.body.name && isEmpty(req.body.name)) {
    delete req.body.name;
  }
  if (req.body.link && isEmpty(req.body.link)) {
    delete req.body.link;
  }

  // Now remove all related standings
  try {
    if (!contestId) {
      const e = new Error(
        `contestId: ${contestId} query is missing`);
      e.status = 400;
      throw e;
    }
    const contest = await Contest.findOne({_id: contestId, coach: userId}).exec();
    if (!contest) {
      const e = new Error(
        `contestId: ${contestId} No such contest `);
      e.status = 400;
      throw e;
    }
    const updated = await Contest.findByIdAndUpdate(
      contestId,
      pick(req.body, ['name', 'link']),
      {
        new: true,
      }
    ).exec();
    return res.status(200).json({
      status: 200,
      data: updated,
    });
  } catch (err) {
    err.message = err.message + ' Error in contest deletion';
    err.status = 500;
    err.type = 'contest-error';
    return next(err);
  }
}


// Only allow deleting standings
async function deleteContest(req, res, next) {
  const {contestId} = req.params;
  const {userId} = req.session;

  // Now remove all related standings
  try {
    if (!contestId) {
      const e = new Error(
        `contestId: ${contestId} query is missing`);
      e.status = 400;
      throw e;
    }
    const contest = await Contest.findOne({_id: contestId, coach: userId}).exec();
    if (!contest) {
      const e = new Error(
        `contestId: ${contestId} No such contest `);
      e.status = 400;
      throw e;
    }
    const standings = await Standing.find({contestId}).exec();
    if (!isEmpty(standings)) {
      return res.status(400).json({
        status: 400,
        message: 'Cannot delete classroom with existing standing.',
      });
    }
    await Contest.findByIdAndDelete(contestId).exec();
    return res.status(200).json({
      status: 200,
    });
  } catch (err) {
    err.message = err.message + ' Error in contest deletion';
    err.status = 500;
    err.type = 'contest-error';
    return next(err);
  }
}
