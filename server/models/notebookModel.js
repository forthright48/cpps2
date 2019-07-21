const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: matchSlug,
      message: 'Invalid Slug - Small letters, digits and hyphens only',
    },
  },
  body: {
    type: String,
  },
  createdBy: {
    type: String,
    // required: true enforced by system
  },
  lastUpdatedBy: {
    type: String,
    // required: true enforced by system
  },
});

function matchSlug(val) {
  const re = new RegExp('[a-z0-9-]+');
  return re.test(val);
}

noteSchema.pre('save', function(next, req) {
  if (!req.session) {
    return next();
  }
  const doc = this; //eslint-disable-line
  if (!doc.createdBy) doc.createdBy = req.session.username;
  doc.lastUpdatedBy = req.session.username;
  return next();
});

module.exports = noteSchema.plugin(timestamps);

mongoose.model('Notebook', noteSchema);
