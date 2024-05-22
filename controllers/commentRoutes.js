const express = require('express');
const commentRoutes = express.Router();
const { Comment, User } = require('../models');

// Create a new comment
commentRoutes.post('/', async (req, res) => {
  console.log('Received comment request:', req.body);

  try {
    if (!req.session.logged_in) {
      console.log('User not logged in');
      res.status(401).json({ message: 'You need to be logged in to comment' });
      return;
    }

    console.log('User is logged in:', req.session.user_id);

    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log('New comment created with ID:', newComment.id);

    const commentWithUser = await Comment.findByPk(newComment.id, {
      include: [{ model: User, attributes: ['username'] }],
    });

    console.log('Comment with user details:', commentWithUser);
    res.status(200).json(commentWithUser);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(400).json(err);
  }
});

// Get all comments
commentRoutes.get('/', async (req, res) => {
  try {
    console.log('Fetching all comments');
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    console.log('Fetched comments:', comments);
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json(err);
  }
});

// Get a comment by ID
commentRoutes.get('/:id', async (req, res) => {
  try {
    console.log('Fetching comment with ID:', req.params.id);
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!commentData) {
      console.log('No comment found with ID:', req.params.id);
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    console.log('Fetched comment:', commentData);
    res.status(200).json(commentData);
  } catch (err) {
    console.error('Error fetching comment:', err);
    res.status(500).json(err);
  }
});

// Update a comment
commentRoutes.put('/:id', async (req, res) => {
  try {
    console.log('Updating comment with ID:', req.params.id);
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    console.log('Updated comment:', updatedComment);
    res.status(200).json(updatedComment);
  } catch (err) {
    console.error('Error updating comment:', err);
    res.status(400).json(err);
  }
});

// Delete a comment
commentRoutes.delete('/:id', async (req, res) => {
  try {
    console.log('Deleting comment with ID:', req.params.id);
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      console.log('No comment found with ID:', req.params.id);
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    console.log('Deleted comment:', commentData);
    res.status(200).json(commentData);
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json(err);
  }
});

module.exports = commentRoutes;