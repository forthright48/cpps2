const express = require('express');
const mongoose = require('mongoose');
const ProblemList = require('../../models/problemListModel');

const router = express.Router();
const isObjectId = mongoose.Types.ObjectId.isValid;

router.get('/problemlists', getProblemLists);
router.get('/problemlists/:problemListId', getProblemList);
router.delete('/problemlists/:problemListId', deleteProblemList);

router.post('/problemlists', insertProblemList);
router.put('/problemlists/:problemListId/problems', addProblemToList);
router.delete('/problemlists/:problemListId/problems', deleteProblemFromList);

router.put('/problemlists/:problemListId/shared-with', shareWithClassroom);
router.delete(
  '/problemlists/:problemListId/shared-with',
  removeShareWithAClassroom
);

module.exports = {
  addRouter(app) {
    app.use('/api/v1', router);
  },
};

async function getProblemLists(req, res, next) {
  try {
    const {userId, username} = req.session;
    const {createdBy = userId} = req.query;

    if (userId !== createdBy) {
      return next({
        status: 401,
        message: `You ${username}:${userId} cannot view list of ${createdBy}`,
      });
    }

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

async function getProblemList(req, res, next) {
  try {
    const {problemListId} = req.params;

    if (!problemListId) {
      return next({
        status: 401,
        message: `ProblemListId cannot be blank`,
      });
    }

    const problemList = await ProblemList.findOne({
      _id: problemListId,
    }).exec();

    if (problemList.createdBy.toString() !== req.session.userId) {
      return next({
        status: 401,
        message: `You do not have permission to view this list. Reason - You did not create this list.`,
      });
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

    if (!problemListId) {
      return next({
        status: 401,
        message: `ProblemListId cannot be blank`,
      });
    }

    await ProblemList.findByIdAndRemove(problemListId).exec();

    return res.status(201).json({
      status: 201,
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

    if (!updatedList) {
      return next({
        status: 401,
        message: `Problem List not found`,
      });
    }

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

    await ProblemList.findOneAndUpdate(
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

    await ProblemList.findOneAndUpdate(
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

    await ProblemList.findOneAndUpdate(
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

    return res.status(200).json({
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
}
