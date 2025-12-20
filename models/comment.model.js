const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        content: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);

