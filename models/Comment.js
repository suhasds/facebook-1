const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: String,
    likes: { type: Number, default: 0 },
    post: {
      ref: "Post",
      type: mongoose.Schema.Types.ObjectId
    },
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Comment", commentSchema);
