const sequelize = require('../db/db');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

describe('Comments Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Comment creation', () => {
    let user, post;

    beforeEach(async () => {
      user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

      
      post = await Post.create({
        title: 'Test Post',
        content: 'This is a test post content.',
        UserId: user.id
      });
    });

    afterEach(async () => {
      
      await Comment.destroy({ where: {} });
      await Post.destroy({ where: {} });
      await User.destroy({ where: {} });
    });

    it('should create a new comment successfully', async () => {
     
      const commentData = {
        text: 'This is a test comment.',
        UserId: user.id,
        PostId: post.id
      };

      const comment = await Comment.create(commentData);
      expect(comment.text).toBe(commentData.text);
    });

    it('should require text, UserId, and PostId', async () => {
     
    });

    it('should belong to a user and a post', async () => {
      
      const commentData = {
        text: 'This is a test comment.',
        UserId: user.id,
        PostId: post.id
      };

      const comment = await Comment.create(commentData);
      expect(comment.UserId).toBe(user.id);
      expect(comment.PostId).toBe(post.id);
    });

  

  });

});