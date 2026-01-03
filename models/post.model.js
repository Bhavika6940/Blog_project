const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const User = require('./user.model');
const Category = require('./category.model');

const Post = sequelize.define('Post',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            unique: true
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        excerpt: {
            type: DataTypes.TEXT,
            allowNull: true
        },


        metaTitle: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        metaDescription: {
            type: DataTypes.TEXT,
            allowNull: true
        },


        tags: {
            type: DataTypes.JSON,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM("Draft", "Published"),
            defaultValue: "Draft"
        },
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'post',
        timestamps: true
    }
);

Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Post.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

User.hasMany(Post, { foreignKey: 'userId', as: 'post' });
Category.hasMany(Post, { foreignKey: 'categoryId', as: 'post' })

module.exports = Post;
