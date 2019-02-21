const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    set: removeNullOrBlank,
    trim: true,
  },
  createdBy: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  problems: [
    {
      platform: String,
      problemId: String,
      title: String,
      link: String,
    },
  ],
  sharedWith: {
    type: [{type: ObjectId, ref: 'Classroom'}],
    default: [],
  },
});

schema.plugin(timestamps);

module.exports = mongoose.model('ProblemList', schema, 'problemLists');

/*
 * Implementation
 */

function removeNullOrBlank(data) {
  if (data === null || data === '') return undefined;
  return data;
}
