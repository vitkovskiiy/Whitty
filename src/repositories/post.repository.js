const prisma = require("../config/prisma.database");

class PostRepository {
  async createPost(userId, imageUrl, caption, content) {
    const createPost = await prisma.post.create({
      data: {
        user_id: userId,
        imageUrl: imageUrl,
        caption: caption,
        content: content,
        created_at: new Date(),
      },
    });
    return createPost;
  }

  async deletePost() {
    //in development
  }

  async updatePost() {
    //in development
  }

  async allPosts(){
    //in development
  }
}
module.exports = new PostRepository();
