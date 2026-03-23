const express = require("express");

const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const postFileMiddleware = require("../middleware/postFileMiddleware");
const PostController = require("../controllers/post.controller")

router.post("/post", requireAuth,postFileMiddleware.single('post'),PostController.createPost)

router.post("/comment", requireAuth, async (req, res) => {
  const { post_id, comment_text } = req.body;
  try {
    const createComment = await prisma.comment.create({
      data: {
        post_id: Number(post_id),
        user_id: req.user.id,
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
    res
      .status(201)
      .json({ message: "Comment created successfully", createComment });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to post comment" });
  }
});

router.get("/post", PostController.getAllPost)


router.post("/like", requireAuth, async (req, res) => {
  const { post_id } = req.body;
  const user_id = req.user.id;
  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        user_id_post_id: {
          user_id: user_id,
          post_id: Number(post_id),
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          user_id_post_id: {
            user_id: user_id,
            post_id: Number(post_id),
          },
        },
      });

      await prisma.post.update({
        where: { post_id: Number(post_id) },
        data: { likes_count: { decrement: 1 } },
      });
      return res.json({ message: "Unliked", liked: false });
    } else {
      await prisma.like.create({
        data: {
          user_id: user_id,
          post_id: Number(post_id),
        },
      });

      await prisma.post.update({
        where: { post_id: Number(post_id) },
        data: { likes_count: { increment: 1 } },
      });

      return res.json({ message: "Liked", liked: true });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
