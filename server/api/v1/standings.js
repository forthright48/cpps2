const express = require('express');
const {isRoot} = require('middlewares/userGroup');
const Contest = require('../../models/contestModel');
const Standing = require('../../models/standingModel');

const router = express.Router();

router.get('/standings', getStandings);
router.post('/standings', isRoot, insertStandings);
router.delete('/standings', isRoot, deleteStandings);
router.post('/standings/create-ranklist', getRawRanklist);

module.exports = {
  addRouter(app) {
    app.use('/api/v1', router);
  },
};

async function getStandings(req, res, next) {
  try {
    const {contestId} = req.query;
    if (!contestId) {
      const e = new Error(
        `contestId: ${contestId} query is missing`);
      e.status = 400;
      throw e;
    }
    const standings = await Standing.find({contestId}).exec();

    return res.status(200).json({
      status: 200,
      data: standings,
    });
  } catch (err) {
    next(err);
  }
}

async function insertStandings(req, res, next) {
  const {classroomId, standings, contestId} = req.body;
  const {userId} = req.session;
  try {
    const contest = await Contest.findOne({_id: contestId}).exec();
    if (!contest) {
      const e = new Error(
        `contestId: ${contestId} No such contest `);
      e.status = 400;
      throw e;
    }
    if (contest.classroomId.toString() !== classroomId ) {
      const e = new Error(
        `classroomId: ${classroomId} No such classroom `);
      e.status = 400;
      throw e;
    }

    if (contest.coach.toString() !== userId.toString()) {
      const e = new Error('You are not the owner');
      e.status = 400;
      throw e;
    }

    const data = await Promise.all(standings.map(async (s)=>{
      const standing = new Standing({
        username: s.username,
        userId: s.userId,
        position: s.position,
        contestId,
        classroomId,
        coach: userId,
        previousRating: s.previousRating,
        newRating: s.newRating,
      });
      await standing.save();
      return standing;
    }));

    return res.status(201).json({
      status: 201,
      data,
    });
  } catch (err) {
    err.message = err.message + ' Error in standings creation';
    err.status = 500;
    err.type = 'standings-error';
    return next(err);
  }
}

async function deleteStandings(req, res, next) {
  const {classroomId, contestId} = req.body;
  const {userId} = req.session;

  try {
    const contest = await Contest.findOne({_id: contestId}).exec();
    if (!contest) {
      const e = new Error(
        `contestId: ${contestId} No such contest `);
      e.status = 400;
      throw e;
    }
    if (contest.classroomId.toString() !== classroomId ) {
      const e = new Error(
        `classroomId: ${classroomId} No such classroom `);
      e.status = 400;
      throw e;
    }

  // Now remove all related standings
    await Standing.remove({
      contestId,
      coach: userId,
    }).exec();
    return res.status(200).json({
      status: 200,
    });
  } catch (err) {
    err.message = err.message + ' Error in standings deletion';
    err.status = 500;
    err.type = 'standings-error';
    return next(err);
  }
}

function runScript() {
  const {spawn} = require("child_process");
  return new Promise(function(resolve,reject) {
    const pythonProcess = spawn(
      "python", 
      ["./server/api/public/script.py"],
    );
    pythonProcess.stdout.on("data", data => {
      console.log(data.toString());
    });
    pythonProcess.on("exit", code => {
      console.log(`Child exited with code ${code}`);
      resolve();
    });
  });
}

async function getRawRanklist (req, res, next) {
  try {
    await childProcess();
    return res.status(200).json({
      stauts: 200,
    });
  } catch (err) {
    return next(err);
  }
}
