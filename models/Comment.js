const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    Post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    },
    likes: Number
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment",commentSchema);

module.exports = Comment;