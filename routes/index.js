const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

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

module.exports = router;
