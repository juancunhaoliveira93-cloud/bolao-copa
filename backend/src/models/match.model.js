const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  teamA: {
    type: String,
    required: true
  },
  teamB: {
    type: String,
    required: true
  },
  matchDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'finished'],
    default: 'pending'
  },
  resultA: {
    type: Number,
    default: null
  },
  resultB: {
    type: Number,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);