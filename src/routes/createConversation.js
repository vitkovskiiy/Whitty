const express = require("express");
const jwt = require("jsonwebtoken");
const prisma = require("../repositories/index");
const router = express.Router();

router.post("/create-conversation", async (req, res) => {
  const { partner_id } = req.body;
  const coockies = req.cookies.jwt;
  const parse = jwt.decode(coockies);
  const myID = parse.id;

  try {
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: {
          participants: { some: { user_id: parseInt(myID) } },
          participants: { some: { user_id: parseInt(partner_id) } },
        },
      },
      include: {
        participants: true,
        messages: true,
      },
    });
    if (existingConversation) {
      return res.status(400).json({
        message: "Conversation already exists!",
        conversation: existingConversation,
      });
    } else {
      const conversation = await prisma.conversation.create({
        data: {
          participants: {
            connect: [{ user_id: myID }, { user_id: partner_id }],
          },
        },
        include: {
          participants: true,
        },
      });
      res.json({ message: "Conversation created!", conversation });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to create conversation" });
  }
});
module.exports = router;
