const express = require('express');
const mongoose = require('mongoose');
const {isEmpty, pick} = require('lodash');
const {isCoach} = require('middlewares/userGroup');
const Classroom = require('../../models/classroomModel');
const ProblemList = require('../../models/problemListModel');

const router = express.Router();
const isObjectId = mongoose.Types.ObjectId.isValid;

router.get('/problemlists', getProblemLists);
router.get('/problemlists/:problemListId', getProblemList);
router.put('/problemlists/:problemListId', updateProblemList);
router.delete('/problemlists/:problemListId', deleteProblemList);

router.post('/problemlists', insertProblemList);
router.put('/problemlists/:problemListId/problems', addProblemToList);
router.delete('/problemlists/:problemListId/problems', deleteProblemFromList);

router.put('/problemlists/:problemListId/shared-with', isCoach, shareWithClassroom);
router.delete('/problemlists/:problemListId/shared-with', isCoach, removeShareWithAClassroom);

module.exports = {
  addRouter(app) {
    app.use('/api/v1', router);
  },
};

async function getProblemLists(req, res, next) {
  try {
    const {userId} = req.session;
    const createdBy = userId;

    const problemLists = await ProblemList.find({createdBy}).exec();
    return res.status(200).json({
      status: 200,
      data: problemLists,
    });
  } catch (err) {
    return next(err);
  }
}

async function insertProblemList(req, res, next) {
  try {
    const {userId} = req.session;
    const {title} = req.body;
    if (!title) {
      return next({
        status: 400,
        message: `Title cannot be empty`,
      });
    }

    const problemList = new ProblemList({
      title,
      createdBy: userId,
      problems: [],
    });

    await problemList.save();
    return res.status(201).json({
      status: 201,
      data: problemList,
    });
  } catch (err) {
    return next(err);
  }
}

async function updateProblemList(req, res, next) {
  try {
    const {problemListId} = req.params;
    const {userId} = req.session;
    if (!problemListId) {
      return next({
        status: 400,
        message: `problemListId cannot be empty`,
      });
    }

    if (req.body.title && isEmpty(req.body.title)) {
      delete req.body.title;
    }

    const newProblemList = await ProblemList.findOneAndUpdate({
        _id: problemListId,
        createdBy: userId,
      }, pick(req.body, ['title']), {
        new: true,
      },
    ).exec();

    if (!newProblemList) {
      return next({
        status: 404,
        message: `ProblemList not found`,
      });
    }

    return res.status(200).json({
      status: 200,
      data: newProblemList,
    });
  } catch (err) {
    return next(err);
  }
}

async function getProblemList(req, res, next) {
  try {
    const {problemListId} = req.params;
    const {userId} = req.session;

    if (!problemListId) {
      return next({
        status: 400,
        message: `ProblemListId cannot be blank`,
      });
    }

    const problemList = await ProblemList.findOne({
      _id: problemListId,
    }).exec();

    if (!problemList) {
      return next({
        status: 404,
        message: `ProblemListId not found`,
      });
    }

    let isCreator = true;

    if (problemList.createdBy.toString() !== req.session.userId) {
      const classrooms = await Classroom.find(
        {students: userId},
      ).exec();
      const classIds = classrooms.map((e) => {
        return e._id.toString();
      });
      const sharedWith = problemList.sharedWith.map((e) => {
        return e.toString();
      });
      let validClassIds = classIds.filter((e) => {
        return sharedWith.includes(e);
      });

      if (!validClassIds.length) {
        return next({
          status: 401,
          message: `You do not have permission to view this list.`,
        });
      }

      isCreator = false;
    }

    if (!isCreator) {
      problemList.sharedWith = [];
    }

    return res.status(200).json({
      status: 200,
      data: problemList,
    });
  } catch (err) {
    return next(err);
  }
}

async function deleteProblemList(req, res, next) {
  try {
    const {problemListId} = req.params;
    const {userId} = req.session;

    if (!problemListId) {
      return next({
        status: 401,
        message: `ProblemListId cannot be blank`,
      });
    }

    const problemList = await ProblemList.findOneAndDelete({
      _id: problemListId,
      createdBy: userId,
    }).exec();

    if (!problemList) {
      return next({
        status: 404,
        message: `ProblemList not found`,
      });
    }

    return res.status(200).json({
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
}

async function addProblemToList(req, res, next) {
  try {
    const {problemListId} = req.params;
    const {title, platform, problemId, link} = req.body;

    if (!problemListId || !title || !platform || !problemId || !link) {
      return next({
        status: 401,
        message: `Some parameters are blank`,
      });
    }

    const problemList = await ProblemList.findOne({
      _id: problemListId,
      createdBy: req.session.userId,
    }).exec();

    if (!problemList) {
      return next({
        status: 404,
        message: `Problem List not found`,
      });
    }

    for (const problem of problemList.problems) {
      if (problem.platform === platform && problem.problemId === problemId) {
        return res.status(200).json({
          status: 200,
        });
      }
    }

    const updatedList = await ProblemList.findOneAndUpdate(
      {
        _id: problemListId,
        createdBy: req.session.userId,
      },
      {
        $push: {
          problems: {
            title,
            platform,
            problemId,
            link,
          },
        },
      },
      {
        new: true,
      }
    );

    return res.status(201).json({
      status: 201,
      data: updatedList.problems[updatedList.problems.length - 1],
    });
  } catch (err) {
    return next(err);
  }
}

async function deleteProblemFromList(req, res, next) {
  try {
    const {problemListId} = req.params;
    const {pid} = req.body;

    if (!problemListId || !pid) {
      return next({
        status: 401,
        message: `Some parameters are blank`,
      });
    }

    const problemList = await ProblemList.findOneAndUpdate(
      {
        _id: problemListId,
        createdBy: req.session.userId,
      },
      {
        $pull: {
          problems: {
            _id: pid,
          },
        },
      },
      {
        new: true,
      }
    );

    if (!problemList) {
      return next({
        status: 404,
        message: `Problem List not found`,
      });
    }

    return res.status(201).json({
      status: 201,
    });
  } catch (err) {
    return next(err);
  }
}

async function shareWithClassroom(req, res, next) {
  try {
    const {problemListId} = req.params;
    const {classId} = req.body;
    const {userId} = req.session;

    if (!problemListId || !isObjectId(problemListId)) {
      return next({
        status: 401,
        message: `problemListId:${problemListId} is not a valid objectId`,
      });
    }

    if (!classId || !isObjectId(classId)) {
      return next({
        status: 401,
        message: `ClassId:${classId} is not a valid objectId`,
      });
    }

    const classroom = await Classroom.findOne({
      _id: classId,
      coach: userId,
    }).exec();

    if (!classroom) {
      return next({
        status: 404,
        message: `Classroom not found`,
      });
    }

    const problemList = await ProblemList.findOneAndUpdate(
      {
        _id: problemListId,
        createdBy: userId,
      },
      {
        $addToSet: {
          sharedWith: classId,
        },
      }
    );

    if (!problemList) {
      return next({
        status: 404,
        message: `Problem List not found`,
      });
    }

    return res.status(201).json({
      status: 201,
    });
  } catch (err) {
    return next(err);
  }
}

async function removeShareWithAClassroom(req, res, next) {
  try {
    const {problemListId} = req.params;
    const {classId} = req.body;
    const {userId} = req.session;

    if (!problemListId || !isObjectId(problemListId)) {
      return next({
        status: 401,
        message: `problemListId:${problemListId} is not a valid objectId`,
      });
    }

    if (!classId || !isObjectId(classId)) {
      return next({
        status: 401,
        message: `ClassId:${classId} is not a valid objectId`,
      });
    }

    const classroom = await Classroom.findOne({
      _id: classId,
      coach: userId,
    }).exec();

    if (!classroom) {
      return next({
        status: 404,
        message: `Classroom not found`,
      });
    }

    const problemList = await ProblemList.findOneAndUpdate(
      {
        _id: problemListId,
        createdBy: userId,
      },
      {
        $pull: {
          sharedWith: classId,
        },
      }
    );

    if (!problemList) {
      return next({
        status: 404,
        message: `Problem List not found`,
      });
    }

    return res.status(200).json({
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
}
