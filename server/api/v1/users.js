const express = require('express');
const router = express.Router();
const User = require('mongoose').model('User');
// const Classroom = require('mongoose').model('Classroom');
// const Gate = require('mongoose').model('Gate');
// const ojnames = require(path.join(rootPath, 'models/ojnames'));
// const ojnamesOnly = ojnames.data.map((x)=>x.name);
const logger = require('logger');
// const queue = require('queue');

// router.get('/users/username-userId/:username', getUserIdFromUsername );
// router.get('/users/stats/whoSolvedIt', whoSolvedIt );

router.get('/users/info', getInfo);
router.post('/users/logout', logout);
// router.get('/users/:username', getUser );
// router.get('/users/:username/root-stats', rootStats);
// router.put('/users/:username/sync-solve-count', syncSolveCount);
//
// router.put('/users/:username/change-password', changePassword);
//
// router.put('/users/:username/unset-oj-username/:ojname', unsetOjUsername);
// router.put('/users/:username/set-oj-username/:ojname/:userId', setOjUsername);


module.exports = {
  addRouter(app) {
    app.use('/api/v1', router);
  },
};

function getInfo(req, res, next) {
  const s = req.session;
  return res.status(200).json({
    status: 200,
    data: {
      username: s.username,
      roles: s.roles,
      email: s.email,
    },
  });
}

function logout(req, res, next) {
  req.session.destroy(function(err) {
    if (err) next(err);
    return res.status(200).json({
      status: 200,
      message: 'Logged out succefully',
    });
  });
}

// async function getUserIdFromUsername(req, res, next) {
//   try {
//     const {username} = req.params;
//     if (!username) {
//       const err = new Error(`Query 'username' must be provided`);
//       err.status = 400;
//       throw err;
//     }
//     const user = await User.findOne({username}, {_id: 1});
//     if (!user) {
//       const err = new Error(`Username ${username} not found`);
//       err.status = 404;
//       throw err;
//     }
//     return res.status(200).json({
//       status: 200,
//       data: user._id,
//     });
//   } catch (err) {
//     next(err);
//   }
// }
//
// async function getUser(req, res, next) {
//   try {
//     const {username} = req.params;
//     const {select} = req.query;
//
//     const user = await User.findOne({username}).select(select).exec();
//
//     if (!user) {
//       const err = new Error('No such user');
//       err.status = 400;
//       throw err;
//     }
//
//     // Remove sensitive information
//     user.email = undefined;
//     user.password = undefined;
//
//     return res.status(200).json({
//       status: 200,
//       data: user,
//     });
//   } catch (err) {
//     return next(err);
//   }
// }
//
// async function whoSolvedIt(req, res, next) {
//   try {
//     const {problemList, classId} = req.query;
//
//     const studentList = await Classroom
//       .findOne({_id: classId})
//       .select({students: 1})
//       .exec();
//
//     const studentIds = studentList.students;
//
//     const resp = await Promise.all(problemList.map(async (p)=>{
//       const solvedBy = await User.find({
//         _id: studentIds,
//         ojStats: {
//           $elemMatch: {
//             ojname: p.ojname,
//             solveList: p.problemId,
//           },
//         },
//       }).select('_id username').exec();
//       p.solvedBy = solvedBy.map((x)=>x.username);
//       p.solveCount = solvedBy.length;
//       return p;
//     }));
//
//     return res.status(200).json({
//       status: 200,
//       data: resp,
//     });
//   } catch (err) {
//     return next(err);
//   }
// }
//
//
// async function rootStats(req, res, next) {
//   const {username} = req.params;
//   const parentId = '0'.repeat(24);
//
//   try {
//     const root = {
//       _id: parentId,
//     };
//     if (!root) throw new Error(`No parent with id ${parentId}`);
//
//     await setFolderStat(root, username);
//
//     // Grab children under root
//     const childrenModel = await Gate.find({parentId})
//       .select('_id title').lean().exec();
//
//     const childrenWithStat = await Promise.all(childrenModel
//       .map(async (child)=>{
//         await setFolderStat(child, username);
//         return child;
//       }));
//
//     return res.json({
//       status: 200,
//       data: {
//         root,
//         children: childrenWithStat,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// }
//
// async function setFolderStat(folder, username) {
//   try {
//     const totalProblems = await Gate.count({
//       ancestor: folder._id,
//       type: 'problem',
//     }).exec();
//
//     const userSolved = await Gate.count({
//       ancestor: folder._id,
//       type: 'problem',
//       doneList: username,
//     });
//
//     folder.total = totalProblems;
//     folder.user = userSolved;
//   } catch (err) {
//     throw err;
//   }
// }
//
// async function syncSolveCount(req, res, next) {
//   const username = req.params.username;
//   if (!username) {
//     return res.status(400).json({
//       status: 400,
//       message: `Invalid username: ${username}. You cannot sync this user.`,
//     });
//   }
//   logger.info(`syncSolveCount: ${req.session.username} has synced solve count of ${username}`);
//
//   try {
//     const job = queue.create('syncSolveCount', {
//       title: username,
//       requestedBy: req.session.username,
//     }).unique(username).ttl(300000);
//
//     job.on('complete', function(result) {
//       job.remove(function(error, job) {
//         if (error) {
//           logger.error(error);
//         }
//       });
//     });
//
//     job.on('error', function(err) {
//       logger.error(err);
//       job.remove(function(error, job) {
//         if (error) {
//           logger.error(error);
//         }
//       });
//     });
//
//     job.save(function(err) {
//       if (err) next(err);
//       else {
//         return res.status(202).json({
//           status: 202,
//         });
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// }
//
// async function unsetOjUsername(req, res, next) {
//   try {
//     const username = req.session.username;
//     const ojname = req.params.ojname;
//     if (username !== req.params.username) {
//       throw new Error(`UnsetOjUsername: {username} cannot unset oj username of ${req.params.username}`);
//     }
//
//     const user = await User.findOne({username}).exec();
//     const ojStats = user.ojStats;
//
//     const oj = ojStats.filter((x)=>x.ojname === ojname)[0];
//
//     if (!oj) {
//       throw new Error(`unsetOjUsername: No such oj ${ojname}`);
//     }
//
//     // Now, remove user from all problems present in solvelist
//
//     const solveList = oj.solveList;
//
//     await Gate.update({
//       platform: ojname,
//       pid: {
//         $in: solveList,
//       },
//     }, {
//       $pull: {
//         doneList: username,
//       },
//     }, {
//       multi: true,
//     });
//
//     logger.info(`unsetOjUsername: ${username} has removed ${ojname}:${oj.userIds[0]}`);
//
//     oj.userIds = [];
//     oj.solveCount = 0;
//     oj.solveList = [];
//
//     await user.save();
//
//     return res.status(201).json({
//       status: 201,
//       data: user.ojStats,
//     });
//   } catch (err) {
//     next(err);
//   }
// }
//
// async function setOjUsername(req, res, next) {
//   try {
//     const username = req.session.username;
//     const ojname = req.params.ojname;
//     const userId = req.params.userId;
//     if (username !== req.params.username) {
//       throw new Error(`setOjUsername: {username} cannot unset oj username of ${req.params.username}`);
//     }
//     if (ojnamesOnly.findIndex((x)=>x === ojname) === -1) {
//       throw new Error(`setOjUsername: no such ojname ${ojname}`);
//     }
//
//     const user = await User.findOne({username}).exec();
//     const ojStats = user.ojStats;
//
//     let oj = ojStats.filter((x)=>x.ojname === ojname)[0];
//
//     if (!oj) {
//       oj = {
//         ojname,
//         userIds: [],
//         solveCount: 0,
//         solveList: [],
//       };
//       ojStats.push(oj);
//     }
//
//     if (oj.userIds.length === 1) {
//       throw new Error('setOjUsername: cannot set multiple userId');
//     }
//
//     oj.userIds = [userId];
//
//     logger.info(`setOjUsername: ${username} has set userId for ${ojname}:${oj.userIds[0]}`);
//
//     await user.save();
//
//     return res.status(201).json({
//       status: 201,
//       data: user.ojStats,
//     });
//   } catch (err) {
//     next(err);
//   }
// }
//
// async function changePassword(req, res, next) {
//   try {
//     const {currentPassword, newPassword, repeatPassword} = req.body;
//
//     if (newPassword !== repeatPassword) {
//       return next({
//         status: 400,
//         message: 'New password does not match with retyped password',
//       });
//     }
//
//     const username = req.session.username;
//
//     if (username !== req.params.username) {
//       return next({
//         status: 400,
//         message: `You ${username} cannot change password of ${req.params.username}`,
//       });
//     }
//
//     const user = await User.findOne({username}).exec();
//     if (!user) {
//       return next({
//         status: 400,
//         message: `No user found with username ${username}`,
//       });
//     }
//
//     if (!user.comparePassword(currentPassword)) {
//       return next({
//         status: 400,
//         message: `Current Password is Wrong`,
//       });
//     }
//
//     user.password = User.createHash(newPassword);
//     await user.save();
//
//     return res.status(201).json({
//       status: 201,
//     });
//   } catch (err) {
//     return next(err);
//   }
// }
