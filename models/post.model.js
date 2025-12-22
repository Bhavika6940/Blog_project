const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const user = require('./User');
const Category = require('./Category');

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
            enum: DataTypes.ENUM("Draft", "Published"),
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
        tableName: 'posts',
        timestamps: true
    }
);

Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
Post.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Category.hasMany(Post, { foreignKey: 'categoryId', as: 'posts' })

module.exports = Post;
