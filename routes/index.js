const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

/* GET home page. */
router.get("/", function(req, res, next) {
  Post.find(
    {},
    [],
    {
      sort: {
        createdAt: "desc",
      },
    }).populate("comments").exec(
    function(err, posts) {
      if (err) {
        return res.send("error");
      }
      console.log(posts[0])
      res.render("wall", {
        posts: posts,
      });
    }
  );
});

module.exports = router;
