const PostService = require("../services/post.service");

class PostController {
  async createPost(req, res) {
    console.log(req.file);
    const avatarUrl = req.file.path;
    const userId = req.user.id;
    const { content, caption } = req.body;

    const createPost = PostService.createPost(
      userId,
      avatarUrl,
      caption,
      content,
    );
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

  async getAllPost(req, res) {
    const getAllPost = await PostService.getAllPosts();
    if(!getAllPost){
      res.status(500).json({
        message: "Error fetch all posts",
      })
    }
    res.send(getAllPost)
  }
  async createComment(req, res) {
    const { post_id, comment_text } = req.body;
    const user_id = req.user.id;
    const createComment = await PostService.createComment(post_id,user_id,comment_text);
    if (!createComment) {
      res.status(500).json({
        message: "Error when tried to create comment ;(",
      });
    }
    res.status(200).send(createComment);
  }
  async likePost(req, res) {
    const { post_id } = req.body;
    const user_id = req.user.id;

    const likePost = await PostService.likePost(user_id, post_id);
    if (!likePost) {
      res.status(500).json({
        message: "Error while liking",
      });
    }
  }
}

module.exports = new PostController();
