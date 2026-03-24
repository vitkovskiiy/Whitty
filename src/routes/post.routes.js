const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const postFileMiddleware = require("../middleware/postFileMiddleware");
const PostController = require("../controllers/post.controller")

router.post("/post", requireAuth,postFileMiddleware.single('post'),PostController.createPost)

router.post("/comment", requireAuth,PostController.createComment) 

router.get("/post", PostController.getAllPost)

router.post("/like", requireAuth, PostController.likePost)
  

module.exports = router;