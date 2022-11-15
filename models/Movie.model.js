const { Schema, model, Types } = require('mongoose');

const movieSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
    },
    plot: {
      type: String,
      trim: true,
    },
    cast: [{
      type: Types.ObjectId,
      ref: 'Celebrity',
    }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const MovieModel = model('Movie', movieSchema);

module.exports = MovieModel;
