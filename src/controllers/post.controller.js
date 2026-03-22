const PostService = require("../services/post.service");

class PostController {
  async createPost(req, res) {
    console.log(req.file);
    const avatarUrl = req.file.path;
    const userId = req.user.id;
    const caption = req.body.caption;
    const content = req.body.content;

    const createPost = PostService.createPost(userId, avatarUrl, caption, content);
    if (createPost) {
      res.status(200).json({
        message: "Post created successfully",
      });
    } else {
      res.status(401).json({
        message: "Failed",
      });
    }
  }
}

module.exports = new PostController();
