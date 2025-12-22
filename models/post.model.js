const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const user = require('./User');
const Category = require('./Category');

const Post = sequelize.define(
    {
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            unique: true
        },

        content: {
            type: String,
            required: true
        },

        excerpt: String,


        metaTitle: { type: String },
        metaDescription: { type: String },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },

        tags: [String],
        status: {
            type: String,
            enum: ["Draft", "Published"],
            default: "Draft"
        },
        views: {
            type: Number,
            default: 0
        },
        image: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
