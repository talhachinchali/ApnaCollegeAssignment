const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  youtubeLink: {
    type: String,
    trim: true
  },
  leetcodeLink: {
    type: String,
    trim: true
  },
  codeforcesLink: {
    type: String,
    trim: true
  },
  articleLink: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    required: true
  }
});

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  problems: [problemSchema],
  order: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Topic', topicSchema);
