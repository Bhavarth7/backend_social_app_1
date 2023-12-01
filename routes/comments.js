const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Create a new comment for a post
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      author: req.body.author, // Assuming author ID is sent in request body
      post: req.body.post, // Assuming post ID is sent in request body
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create a new comment' });
  }
});

// Get comments for a specific post by post ID
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve comments for the post' });
  }
});

module.exports = router;
