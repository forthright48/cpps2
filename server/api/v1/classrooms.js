const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/userModel');
const ProblemList = require('../../models/problemListModel');
const Classroom = require('../../models/classroomModel');
const {isCoach} = require('middlewares/userGroup');

const router = express.Router();
const isObjectId = mongoose.Types.ObjectId.isValid;

router.get('/classrooms', getClassrooms);
router.post('/classrooms', isCoach, insertClassroom);

router.get('/classrooms/:classId', getClassroom);

router.put('/classrooms/:classId/students', isCoach, addStudent);
router.delete('/classrooms/:classId/students', isCoach, deleteStudent);

router.patch('/classrooms/:classId', isCoach, updateClassroom);
// router.delete('/classrooms/:classId', isCoach, deleteClassroom);
// hidden till implemented properly

router.get('/classrooms/:classId/problemlists', getProblemLists);
router.get('/classrooms/:classId/who-solved-it', solveCountInClassroom);
router.get('/classrooms/:classId/leaderboard', getLeaderboard);

module.exports = {
  addRouter(app) {
    app.use('/api/v1', router);
  },
};
/**
 *Implementation
 */

async function getClassrooms(req, res, next) {
  try {
    let {
      coach = false,
      student = false,
    } = req.query;

    const {userId} = req.session;
    const populate = ['coach students', 'username'];
    const options = [];

    if (!coach && !student) coach = true;
    if (coach) options.push({coach: userId});
    if (student) options.push({students: userId});

    const classrooms = await Classroom.find({
      $or: options,
    })
      .populate(populate[0], populate[1])
      .exec();
    return res.status(200).json({
      status: 200,
      data: classrooms,
    });
  } catch (err) {
    return next(err);
  }
}

async function getClassroom(req, res, next) {
  try {
    const {userId} = req.session;
    const {classId} = req.params;
    const classroom = await Classroom.findOne({
      _id: classId,
      $or: [{coach: userId}, {students: userId}],
    })
      .populate('coach students', 'username')
      .exec();

    if (!classroom) {
      return next({
        status: 400,
        message: 'Classroom doesn\'t exist or you do not have permission to view',
      });
    }
    return res.status(200).json({
      status: 200,
      data: classroom,
    });
  } catch (err) {
    return next(err);
  }
}

async function addStudent(req, res, next) {
  try {
    const {classId} = req.params;
    let {studentUsername} = req.body;
    const {userId} = req.session;

    const student = await User.findOne(
      {
        username: studentUsername,
      }
    ).exec();

    if (!student) {
      const e = new Error(`No such user: ${studentUsername}`);
      e.status = 400;
      throw e;
    }

    const classroom = await Classroom.findOneAndUpdate(
      {
        _id: classId,
        coach: userId,
      },
      {
        $addToSet: {
          students: student._id,
        },
      },
      {
        new: true,
      }
    )
      .populate('coach students', 'username')
      .exec();

    if (!classroom) {
      const e = new Error(`No such classroom: ${classId}`);
      e.status = 400;
      throw e;
    }

    return res.status(201).json({
      status: 201,
      data: classroom,
    });
  } catch (err) {
    return next(err);
  }
}

async function deleteStudent(req, res, next) {
  try {
    const {classId} = req.params;
    const {studentUsername} = req.body;
    const {userId} = req.session;

    const student = await User.findOne(
      {
        username: studentUsername,
      }
    ).exec();

    if (!student) {
      const e = new Error(`No such user: ${studentUsername}`);
      e.status = 400;
      throw e;
    }

    const classroom = await Classroom.findOneAndUpdate(
      {
        _id: classId,
        coach: userId,
      },
      {
        $pull: {
          students: student._id,
        },
      },
      {
        new: true,
      }
    )
      .populate('coach students', 'username')
      .exec();

    if (!classroom) {
      const e = new Error('No such classroom');
      e.status = 400;
      throw e;
    }

    return res.status(200).json({
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
}

async function insertClassroom(req, res, next) {
  try {
    const {name} = req.body;
    if (!name) {
      const err = new Error('Post body must have name field');
      err.status = 400;
      throw err;
    }
    const classroom = new Classroom({
      name,
      coach: req.session.userId,
      students: [],
    });
    await classroom.save();
    return res.status(201).json({
      status: 201,
      data: classroom,
    });
  } catch (err) {
    return next(err);
  }
}

async function updateClassroom(req, res, next) {
  try {
    const {name} = req.body;
    const {classId} = req.params;
    const {userId} = req.session;
    if (!name) {
      throw new Error('Post body must have name field');
    }
    const classroom = await Classroom.findOneAndUpdate(
      {
        _id: classId,
        coach: userId, // This ensures user is the owner
      },
      {
        name,
      },
      {
        new: true,
      }
    );

    return res.status(201).json({
      status: 201,
      data: classroom,
    });
  } catch (err) {
    return next(err);
  }
}

/*
    * TODO: remove related
    * * contests
    * * standings
    * * ratings
async function deleteClassroom(req, res, next) {
  try {
    const {classId} = req.params;
    const {userId} = req.session;

    const data = await Classroom.findOneAndRemove({
      _id: classId,
      coach: userId,
    }).exec();

    if (!data) {
      const e = new Error(`No such classroom: ${classId}`);
      e.status = 400;
      throw e;
    }

    await ProblemList.update(
      {
        sharedWith: classId,
      },
      {
        $pull: {
          sharedWith: classId,
        },
      },
      {
        multi: true,
      }
    ).exec();

    return res.status(200).json({
      status: 200,
    });
  } catch (err) {
    next(err);
  }
}
*/

async function getProblemLists(req, res, next) {
  try {
    const {classId} = req.params;
    const {userId} = req.session;

    if (!classId || !isObjectId(classId)) {
      return next({
        status: 400,
        message: `classId:${classId} is not a valid objectId`,
      });
    }

    const classroom = await Classroom.findOne({
      _id: classId,
      $or: [{coach: userId}, {students: userId}],
    }).exec();

    if (!classroom) {
      return next({
        status: 404,
        message: `classId:${classId} not found`,
      });
    }

    const problemLists = await ProblemList.find({
      sharedWith: classId,
    })
      .populate('createdBy', 'username')
      .select('title')
      .exec();

    return res.status(200).json({
      status: 200,
      data: problemLists,
    });
  } catch (err) {
    next(err);
  }
}

async function solveCountInClassroom(req, res, next) {
  try {
    const {classId} = req.params;
    const {problemListId} = req.query;
    const {userId} = req.session;

    const studentList = await Classroom.findById(classId).populate('students').exec();
    const problemList = await ProblemList.findById(problemListId).exec();

    if (!studentList || !problemList) {
      return next({
        status: 404,
        message: 'Classroom or ProblemList not found',
      });
    }

    if (studentList.coach.toString() !== problemList.createdBy.toString()) {
      return next({
        status: 401,
        message: 'Owner of classroom and problem list do not match',
      });
    }

    const studentIds = studentList.students.map((s)=>s._id.toString());
    if (userId !== problemList.createdBy.toString() && !studentIds.includes(userId)) {
      return next({
        status: 401,
        message: 'You are neither the owner, nor student of classroom',
      });
    }

    const resp = await Promise.all(problemList.problems.map(async (p)=>{
      const solvedBy = await User.find({
        _id: studentIds,
        ojStats: {
          $elemMatch: {
            ojname: p.platform,
            solveList: p.problemId,
          },
        },
      }).select('_id username').exec();
      return {
        _id: p._id,
        title: p.title,
        platform: p.platform,
        problemId: p.problemId,
        link: p.link,
        solvedBy: solvedBy.map((x)=>x.username),
        solveCount: solvedBy.length,
      };
    }));

    return res.status(200).json({
      status: 200,
      data: {
        ranklist: resp,
        studentUsernames: studentList.students.map((s)=>s.username),
      },
    });
  } catch (err) {
    return next(err);
  }
}

async function getLeaderboard(req, res, next) {
  const {classId} = req.params;
  const userId = req.session.userId;
  try {
    const studentList = await Classroom.findOne({
      _id: classId,
      $or: [{coach: userId}, {students: userId}],
    })
      .select('students')
      .exec();

    if (!studentList) {
      return next({
        status: 404,
        message: 'Classroom or ProblemList not found',
      });
    }
    const studentsIdList = studentList.students;

    const userData = await User.aggregate([
      {$match: {_id: {$in: studentsIdList}}},
      {$project: {username: 1, _id: 1, ojStats: 1}},
      {$unwind: '$ojStats'},
      {
        $project: {
          _id: 1,
          username: 1,
          ojname: '$ojStats.ojname',
          solveCount: '$ojStats.solveCount',
        },
      },
      {
        $group: {
          _id: {_id: '$_id', username: '$username'},
          totalSolved: {$sum: '$solveCount'},
          ojStats: {
            $push: {
              ojname: '$ojname',
              solveCount: '$solveCount',
            },
          },
        },
      },
      {$project: {_id: 1, totalSolved: 1, ojStats: 1}},
      {$sort: {totalSolved: -1, username: 1}},
    ]);

    const data = await Promise.all(
      userData.map(function(user) {
        const result = {};
        const {_id, totalSolved, ojStats} = user;
        for (const stat of ojStats) {
          let {ojname, solveCount} = stat;
          if (!solveCount) solveCount = 0;
          result[ojname] = solveCount;
        }
        return {
          ..._id,
          ...result,
          totalSolved,
        };
      })
    );

    return res.status(200).json({
      status: 200,
      data,
    });
  } catch (err) {
    next(err);
  }
}
