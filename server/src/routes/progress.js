const express = require('express');
const Progress = require('../models/Progress');
const auth = require('../middlewares/auth');

const router = express.Router();

// Get user's progress for all topics
router.get('/', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user._id })
      .populate('topicId', 'title')
      .sort({ createdAt: 1 });

    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's progress for a specific topic
router.get('/topic/:topicId', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ 
      userId: req.user._id,
      topicId: req.params.topicId 
    });

    res.json(progress);
  } catch (error) {
    console.error('Get topic progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update progress for a specific problem
router.post('/update', auth, async (req, res) => {
  try {
    const { topicId, problemId, completed } = req.body;

    if (typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'Completed must be a boolean value' });
    }

    const progress = await Progress.findOneAndUpdate(
      { 
        userId: req.user._id,
        topicId,
        problemId 
      },
      { 
        completed,
        completedAt: completed ? new Date() : null
      },
      { 
        upsert: true, 
        new: true 
      }
    );

    res.json(progress);
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get overall progress statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const totalProgress = await Progress.find({ userId: req.user._id });
    const completedCount = totalProgress.filter(p => p.completed).length;
    const totalCount = totalProgress.length;

    res.json({
      totalProblems: totalCount,
      completedProblems: completedCount,
      completionPercentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
    });
  } catch (error) {
    console.error('Get progress stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
