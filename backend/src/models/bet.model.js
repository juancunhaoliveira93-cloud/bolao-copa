const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true
  },
  guessA: {
    type: Number,
    required: true
  },
  guessB: {
    type: Number,
    required: true
  },
  pointsEarned: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Bet', betSchema);