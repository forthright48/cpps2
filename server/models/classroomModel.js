const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const ObjectId = mongoose.Schema.Types.ObjectId;

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    set: removeNullOrBlank,
    required: true,
  },
  coach: {
    type: ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  students: [{type: ObjectId, ref: 'User'}],
});

classroomSchema.plugin(timestamps);

module.exports = mongoose.model('Classroom', classroomSchema, 'classrooms');

/*
 * Implementation
 */

function removeNullOrBlank(data) {
  if (data === null || data === '') return undefined;
  return data;
}

/**
 * Related To:
 *  1. ProblemList
 */
