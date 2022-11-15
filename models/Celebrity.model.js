const { Schema, model } = require('mongoose');

const celebritySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  occupation: {
    type: String,
    default: 'unknown'
  },
  catchPhrase: {
    type: String,
    trim: true,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

const CelebrityModel = model('Celebrity', celebritySchema);

module.exports = CelebrityModel;