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

  async allPosts() {
    const allPosts = await prisma.post.findMany({
      orderBy: { created_at: "desc" },
      include: {
        user: {
          select: { username: true, avatar: true },
        },
        comments: {
          orderBy: { created_at: "asc" },
          include: {
            user: {
              select: { username: true, avatar: true },
            },
          },
        },
      },
    });
    return allPosts;
  }

  async createComment(post_id, user_id, comment_text) {
    const createComment = await prisma.comment.create({
      data: {
        post_id: Number(post_id),
        user_id: user_id,
        comment_text: comment_text,
        created_at: new Date(),
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    return createComment;
  }
  async existingLike(user_id, post_id) {
    const existingLike = await prisma.like.findUnique({
      where: {
        user_id_post_id: {
          user_id: user_id,
          post_id: Number(post_id),
        },
      },
    });
    return existingLike;
  }
  async createLike(user_id, post_id) {
    const createLike = await prisma.$transaction(async (tx) => {
      const addLike = await tx.like.create({
        data: {
          user_id: user_id,
          post_id: Number(post_id),
        },
      });

      const updateLike = await tx.post.update({
        where: { post_id: Number(post_id) },
        data: { likes_count: { increment: 1 } },
      });
    });
    return createLike;
  }
  async deleteLike(user_id, post_id) {
    const deleteLike = await prisma.$transaction(async (tx) => {
      const removeLike = await tx.like.delete({
        where: {
          user_id_post_id: {
            user_id: user_id,
            post_id: Number(post_id),
          },
        },
      });
      const updatePost = await tx.post.update({
        where: { post_id: Number(post_id) },
        data: { likes_count: { decrement: 1 } },
      });
      return deleteLike;
    });
  }
}
module.exports = new PostRepository();
