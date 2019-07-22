const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const ObjectId = mongoose.Schema.Types.ObjectId;

const standingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  position: {
    type: Number,
    required: true,
    set: removeNullOrBlank,
  },
  contestId: {
    type: ObjectId,
    ref: 'Contest',
    required: true,
  },
  classroomId: { // Find all ratings for user U who is member of classroom C
    type: ObjectId,
    ref: 'Classroom',
    required: true,
  },
  coach: {
    type: ObjectId,
    ref: 'User',
  },
  previousRating: {
    type: Number,
    required: true,
    set: removeNullOrBlank,
  },
  newRating: {
    type: Number,
    required: true,
    set: removeNullOrBlank,
  },
});

standingSchema.plugin(timestamps);

module.exports = mongoose.model('Standing', standingSchema, 'standings');

/*
 * Implementation
 */

function removeNullOrBlank(data) {
  if (data === null || data === '') return undefined;
  return data;
}
