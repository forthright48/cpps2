const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ratingSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  classroomId: {
    type: ObjectId,
    ref: 'Classroom',
    required: true,
  },
  currentRating: {
    type: Number,
    required: true,
    set: removeNullOrBlank,
  },
});

ratingSchema.plugin(timestamps);

module.exports = mongoose.model('Rating', ratingSchema, 'ratings');

/*
 * Implementation
 */

function removeNullOrBlank(data) {
  if (data === null || data === '') return undefined;
  return data;
}
