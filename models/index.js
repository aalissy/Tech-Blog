const User = require('./User');
const Post= require('./Post');
const Comment = require('./Comment');

// User has many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// User has Many Comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Posts belongs to User
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Post has many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

// Comments belongs to Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

// Comments belongs to User
Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Post, Comment };
