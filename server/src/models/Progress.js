const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure unique combination of user, topic, and problem
progressSchema.index({ userId: 1, topicId: 1, problemId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
