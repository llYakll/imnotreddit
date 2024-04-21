const sequelize = require('../db/db');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

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
      // Create a user
      user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

      // Create a post associated with the user
      post = await Post.create({
        title: 'Test Post',
        content: 'This is a test post content.',
        UserId: user.id
      });
    });

    afterEach(async () => {
      // Clean up created comments, posts, and users after each test
      await Comment.destroy({ where: {} });
      await Post.destroy({ where: {} });
      await User.destroy({ where: {} });
    });

    it('should create a new comment successfully', async () => {
      // Test logic: Create a new comment and verify if it was created successfully
      const commentData = {
        text: 'This is a test comment.',
        UserId: user.id,
        PostId: post.id
      };

      const comment = await Comment.create(commentData);
      expect(comment.text).toBe(commentData.text);
    });

    it('should require text, UserId, and PostId', async () => {
      // Test logic: Attempt to create a comment without text, UserId, and PostId, expect an error
      await expect(Comment.create({})).rejects.toThrow();
    });

    it('should belong to a user and a post', async () => {
      // Test logic: Create a new comment associated with a user and a post and verify its associations
      const commentData = {
        text: 'This is a test comment.',
        UserId: user.id,
        PostId: post.id
      };

      const comment = await Comment.create(commentData);
      expect(comment.UserId).toBe(user.id);
      expect(comment.PostId).toBe(post.id);
    });

    // Additional test cases can be added for Comment model logic

  });

});