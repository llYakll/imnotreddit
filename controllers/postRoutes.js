const express = require('express');
const postRoutes = express.Router();
const { Post, User, Comment } = require('../models');

// create a new post
postRoutes.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get all posts with user information
postRoutes.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post
postRoutes.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a post
postRoutes.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = postRoutes;