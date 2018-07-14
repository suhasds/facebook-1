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
        res.redirect("/",{user : req.user});
      }
    );
  },
  addComment: function(req, res) {
    const id = req.params.id;if (err) res.render("error", { error: err });
    Comment.create(
      { content: req.body.comment, post: id, user: req.user.id },
      function(err, comment) {
        console.log(id);
        Post.findById(id, function(err, post) {
          post.comments.push(comment);
          post.save();
        });
        res.redirect("/",{user : req.user});
      }
    );
  },
  likePost: function(req, res) {
    const id = req.params.id;
    Post.findById(id, function(err, post) {
      if (err) res.render("error", { error: err });
      post.likes++;
      post.save();
      res.json({success : true});
    });
  }
};
