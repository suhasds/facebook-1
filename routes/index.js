const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

/* GET home page. */
router.get("/", function(req, res, next) {
  Post.find({ user: req.user.id }, [], {
    sort: {
      createdAt: "desc"
    }
  })
    .populate("comments")
    .exec(function(err, posts) {
      if (err) {
        return res.render("error", { error: err });
      }
      res.render("wall", {
        posts: posts,
        user: req.user
      });
    });
});

router.get("/profile", function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    res.render("profile", { user: req.user });
  });
});

router.post("/comments/:id/likes", function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) res.render("error", { error: err });
    comment.likes++;
    comment.save(function cb(err) {
      if(err){
        console.log(err);
      }
    });
    res.json({likes:comment.likes});
  });
});

module.exports = router;
