const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {
  create: function(req, res) {
    const post = req.body.post;

    Post.create(
      {
        content: post,
        user: req.user.id
      },
      function(err, post) {
        res.redirect("/");
      }
    );
  },
  addComment: function(req, res) {
    const id = req.params.id;
    Comment.create(
      { content: req.body.comment, post: id, user: req.user.id },
      function(err, comment) {
        console.log(id);
        Post.findById(id, function(err, post) {
          post.comments.push(comment);
          post.save();
        });
        res.redirect("/");
      }
    );
  }
};
