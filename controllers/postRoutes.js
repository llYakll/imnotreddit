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

// gets all posts with user information
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

// gets a single post with user and comments information
postRoutes.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
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


// update post
postRoutes.put('/:id', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Session user ID:', req.session.user_id);

    // testing: in production decomment
    // if (!req.session.user_id) {
    //   return res.status(401).json({ message: 'You need to log in first' });
    // }

    const [affectedRows] = await Post.update(
      { title: req.body.title, content: req.body.content },
      {
        where: {
          id: req.params.id,
          user_id: req.body.user_id, // Use user_id from request body
        },
      }
    );

    if (!affectedRows) {
      res.status(404).json({ message: 'No post found with this id or you do not have permission to update this post!' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// alt+f4 post
postRoutes.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = postRoutes;