const CommentRoutes = require('express').Router();
const { Comment } = require('../models');

CommentRoutes.post('/', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json({ message: 'You need to be logged in to comment' });
      return;
    }

    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = CommentRoutes;