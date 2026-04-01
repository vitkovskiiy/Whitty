const PostService = require("../../application/services/post.service");

class PostController {
  async createPost(req, res) {
    const avatarUrl = req.file.filename;
    const userId = req.user.id;
    const { content, caption } = req.body;

    const createPost = await PostService.createPost(
      userId,
      avatarUrl,
      caption,
      content,
    );
    if (createPost) {
      return res.status(201).json({
        message: "Post created successfully",
      });
    } else {
      return res.status(401).json({
        message: "Failed",
      });
    }
  }

  async getAllPost(req, res) {
    try {
      const getAllPost = await PostService.getAllPosts();
      res.status.json(getAllPost);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof DomainError) {
        return res.status(400).json({ message: error.message });
      }
      console.log(error.message);
      return res.status(500).json({ message: "Error on server side" });
    }
  }

  async createComment(req, res) {
    try {
      const { post_id, comment_text } = req.body;
      const user_id = req.user.id;
      const createComment = await PostService.createComment(
        post_id,
        user_id,
        comment_text,
      );
      res.status(200).send(createComment);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof DomainError) {
        return res.status(400).json({ message: error.message });
      }
      console.log(error.message);
       return res.status(500).json({ message: "Error on server side" });
    }
  }

  async likePost(req, res) {
    try {
      const { post_id } = req.body;
      const user_id = req.user.id;

      const likePost = await PostService.likePost(user_id, post_id);
      res.status(200).json(likePost);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof DomainError) {
        return res.status(400).json({ message: error.message });
      }
      console.log(error.message);
       return res.status(500).json({ message: "Error on server side" });
    }
  }
}

module.exports = new PostController();
