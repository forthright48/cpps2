const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const schema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    set: removeNullOrBlank,
    trim: true,
  },
  platform: {
    required: true,
    type: String,
    set: removeNullOrBlank,
  },
  problemId: {
    required: true,
    type: String,
    set: removeNullOrBlank,
    trim: true,
  },
  // Link for problem or text
  link: {
    required: true,
    type: String,
    set: removeNullOrBlank,
    trim: true,
  },
});

schema.index({platform: 1, problemId: 1}, {unique: true});
schema.plugin(timestamps);

module.exports = mongoose.model('ProblemBank', schema, 'problemBanks');

/*
 * Implementation
 */

function removeNullOrBlank(data) {
  if (data === null || data === '') return undefined;
  return data;
}
