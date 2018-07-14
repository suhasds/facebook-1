const mongoose = require("mongoose");
const Comment = require("./Comment");

const postSchema = new mongoose.Schema(
  {
    content: String,
    likes: { type: Number, default: 0 },
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    comments: [
      {
        ref: "Comment",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
