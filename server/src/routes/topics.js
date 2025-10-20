const express = require('express');
const Topic = require('../models/Topic');
const auth = require('../middlewares/auth');

const router = express.Router();

// Get all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find().sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single topic with problems
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    console.error('Get topic error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create topic (admin only - for seeding data)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, problems, order } = req.body;
    
    const topic = new Topic({
      title,
      description,
      problems,
      order
    });

    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    console.error('Create topic error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update topic (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json(topic);
  } catch (error) {
    console.error('Update topic error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete topic (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    console.error('Delete topic error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
