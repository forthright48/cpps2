const express = require('express');
const router = express.Router();
const User = require('mongoose').model('User');
// const recaptcha = require('express-recaptcha');
// const allowSignUp = require('middlewares').allowSignUp;
// const mailer = require('mailer').mailer;
const _ = require('lodash');

router.post('/users/login', postLogin);
// router.post('/users/register', [recaptcha.middleware.verify, allowSignUp], postRegister);
router.post('/users/register', postRegister);

module.exports = {
  addRouter(app) {
    app.use('/api/public', router);
  },
};

async function postLogin(req, res, next) {
  if ( req.session && req.session.login ) {
    return next({
      status: 400,
      message: 'Someone is already logged in.',
    });
  }

  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({
        _id: username,
      }).exec();

    if (!user) {
      return next({
        status: 400,
        message: 'User not found.',
      });
    }

    if (await user.comparePassword(password)) {
      req.session.login = true;
      req.session.emailVerified = user.emailVerified;
      if (!user.emailVerified) req.session.emailVerificationValue = user.emailVerificationValue;
      req.session.email = user.email;
      req.session.roles = new Set(user.roles);
      req.session._id = user._id;

      return res.status(200).json({
        status: 200,
        message: 'Successfully logged in',
      });
    } else {
      return next({
        status: 400,
        message: 'Password did not match',
      });
    }
  } catch (err) {
    return next(err);
  }
}

async function postRegister(req, res, next) {
  // if (req.recaptcha.error) {
  //   return next({
  //     status: 400,
  //     message: 'Recaptcha validation failed',
  //   });
  // }

  // TODO: Validate user input

  const username = req.body.username;
  const email = User.normalizeEmail(req.body.email);
  const password = await User.createHash(req.body.password);


  const user = new User({
    _id: username,
    email,
    password,
    emailVerificationValue: _.random(100000, 999999),
  });

  try {
    await user.save();
  } catch (err) {
    if (err.code === 11000) {
      return next({
        status: 400,
        message: `${err.message.includes('email')?'Email address': 'Username'} already exists`,
        error: err,
      });
    } else {
      return next({
        status: 500,
        message: `An error occured while creating user. Error code: ${err.code}`,
        error: err,
      });
    }
  }

  return res.status(201).json({
     status: 201,
     message: 'Successfully Registered. Try logging in.',
   });

  // try {
  //   await sendEmailVerification(user.email, user.emailVerificationValue);
  //   return res.status(201).json({
  //     status: 201,
  //     message: 'Successfully Registered. Email verification code sent.',
  //   });
  // } catch (err) {
  //   return next({
  //     status: 500,
  //     message: 'An error occured while sending verification code',
  //   });
  // }
}

// async function sendEmailVerification(emailAddress, emailVerificationValue) {
//   const email = {
//     to: [emailAddress],
//     from: 'CPPS BACS <no-reply@bacsbd.org>',
//     subject: 'Verfication Code for CPPS',
//     text: `Here is your verification code: ${emailVerificationValue}`,
//     html: `Here is your verification code: <b>${emailVerificationValue}</b>`,
//   };
//   return mailer.sendMail(email);
// }
