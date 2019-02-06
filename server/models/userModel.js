const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  _id: { // Username
    type: String,
    maxlength: 256,
    // validate: /^[A-Za-z_0-9.]+$/g,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 256,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: validator.isEmail,
    maxlength: 256,
    trim: true,
    lowercase: true,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  emailVerificationValue: {
    type: String,
  },
  roles: [String],
  /** Stores usernames/userIDs of the user in various online judge */
  ojStats: [{
    ojname: String,
    userIds: [String], /** Some people have multiple CF accounts for example*/
    solveCount: Number,
    solveList: [String],
    required: true,
    default: [],
  }],
}, {
  timestamps: true,
});

// userSchema.plugin(mongoosePaginate);

userSchema.statics.createSalt = function() {
  return bcrypt.genSalt(10);
};
userSchema.statics.createHash = function(val) {
  return bcrypt.hash(val, 10);
};
userSchema.methods.comparePassword = function(val) {
  return bcrypt.compare(val, this.password);
};
userSchema.statics.normalizeEmail = validator.normalizeEmail;

mongoose.model('User', userSchema);
