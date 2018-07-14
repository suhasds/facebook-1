let express = require("express");
let router = express.Router();
let postController = require("../controllers/postController");

router.post("/",postController.create);
router.post("/:id/comments",postController.addComment);
router.post("/:id/likes",postController.likePost);

module.exports = router;