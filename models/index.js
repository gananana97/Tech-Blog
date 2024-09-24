const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

Blog.belongsTo(User, {
  foreignKey: 'user_Id',
  onDelete: 'CASCADE',
});
User.hasMany(Blog);
Blog.hasMany(Comment, {
  foreignKey: 'blog_Id',
  onDelete: 'CASCADE',
});
Comment.belongsTo(Blog)
Comment.belongsTo(User, {
  foreignKey: 'user_Id',
  onDelete: 'CASCADE',
});
User.hasMany(Comment);
module.exports = {
  User,
  Blog,
  Comment,
};