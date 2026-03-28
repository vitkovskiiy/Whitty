const PostRepository = require("../../infrastructure/repositories/post.repository");

class PostService {
  async createPost(userId, imageUrl, caption, content) {
    const createPost = PostRepository.createPost(userId,imageUrl,caption,content);
    if (!createPost) {
        throw new Error("Error create post")
    }
    return createPost;
  }

  async getAllPosts() {
    const getAllPosts = await PostRepository.allPosts();
    if (!getAllPosts) {
      throw new Error("Error getting posts");
    }
    return getAllPosts;
  }

  async createComment(post_id, user_id, comment_text) {
    const createComment = await PostRepository.createComment(post_id,user_id,comment_text);
    if(!createComment) {
        throw new Error("Error while trying create comment")
    }
    return createComment;
  }

  async likePost(user_id, post_id) {
    const existingLike = await PostRepository.existingLike(user_id, post_id);
    if (existingLike) {
      const deleteLike = PostRepository.deleteLike(user_id, post_id);
      return deleteLike;
    } else {
      const createLike = PostRepository.createLike(user_id, post_id);
      return createLike;
    }
  }
}

module.exports = new PostService();
