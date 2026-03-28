const express = require("express");
const prisma = require("../config/prisma.database");
const router = express.Router();
const {requireAuth} = require("../middleware/authMiddleware")

router.post("/create-conversation",requireAuth, async (req, res) => {
  //in progress to refactoring
  const { partner_id } = req.body;
  const myID = req.user.id;
   if(parseInt(partner_id) === parseInt(myID)){ 
    return res.status(403).send('You cant create conversation with yourself')
  }
  try {
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
         { participants: { some: { user_id: parseInt(myID) } } },
         { participants: { some: { user_id: parseInt(partner_id) } } },
        ],
      },
      include: {
        participants: {
          select: {
            user_id: true,
            username:true,
            avatar: true,
          }
        },
        messages: true,
      },
    })
    if (existingConversation) {
      return res.status(200).json({
        message: "Conversation already exists!",
        conversation: existingConversation,
      });
    } else {
      const conversation = await prisma.conversation.create({
        data: {
          participants: {
            connect: [{ user_id: parseInt(myID) }, { user_id: parseInt(partner_id) }],
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
