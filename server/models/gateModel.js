const mongoose = require('mongoose');
const {ojnamesOnly} = require('./ojInfo');
const validator = require('validator');

function removeNullOrBlank(data) {
  if (data === null || data === '') return undefined;
  return data;
}

const schema = new mongoose.Schema({
  // items: folder, text, problem
  type: {
    type: String,
    set: removeNullOrBlank,
    required: true,
    enum: ['folder', 'text', 'problem'],
  },
  // For children query
  parentId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Gate',
    set: removeNullOrBlank,
  },
  // For subtree query
  ancestor: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Gate',
  }],
  // To reorder items inside same folder
  ind: {
    type: Number,
    set: removeNullOrBlank,
    required: true,
  },
  title: {
    type: String,
    set: removeNullOrBlank,
    trim: true,
    required: true,
  },
  // Contains text body or hint body
  body: {
    type: String,
    set: removeNullOrBlank,
    trim: true,
  },
  platform: {
    type: String,
    set: removeNullOrBlank,
    enum: ojnamesOnly,
  },
  pid: {
    type: String,
    set: removeNullOrBlank,
    trim: true,
  },
  // Link for problem or text
  link: {
    type: String,
    set: removeNullOrBlank,
    trim: true,
    validate: validator.isURL,
  },
  // Stores the userID who solved the problem
  doneList: [{
    type: String,
    ref: 'User',
  }],
  createdBy: {
    type: String,
    ref: 'User',
    // required: true enforced by system
  },
  lastUpdatedBy: {
    type: String,
    ref: 'User',
    // required: true enforced by system
  },
}, {
  timestamps: true,
});

schema.statics.getRoot = function() {
  return mongoose.Types.ObjectId('000000000000000000000000');
};

/**
 * Deals with "createdBy" and "updatedBy"
 */
schema.pre('save', function(next, req) {
  // Need to login first
  if ( !req.session ) {
    return next();
  }

  // Need root priviledge
  if ( req.session.roles.includes('root') === false ) {
    return next();
  }

  const doc = this; //eslint-disable-line

  // Don't update when doneList gets changed
  if ( doc.isNew === false && doc.isModified('doneList')) {
    return next();
  }

  if (!doc.createdBy) doc.createdBy = req.session.username;
  doc.lastUpdatedBy = req.session.username;
  return next();
});

schema.index({platform: 1, pid: 1}, {unique: true, sparse: true});

mongoose.model('Gate', schema);
