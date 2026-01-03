const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const Post = require('./post.model');
const User = require('./user.model')

const Comment = sequelize.define('Comment', {

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
    {
        tableName: 'comment',
        timestamps: true
    }
);
//Associations
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
module.exports = Comment;


