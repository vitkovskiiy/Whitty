const express = require("express");
const prisma = require("../config/prisma.database");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {requireAuth} = require("../middleware/authMiddleware")

router.get("/messages/:conversationId", requireAuth, async (req, res) => {
  const conversationId = req.params.conversationId;
  try {
    const messages = await prisma.message.findMany({
        where: {
        conversationId: conversationId,
        }
  });
    res.json(messages);
  } catch (e) {
    console.log(e);
  }
});

router.post("/messages/:conversationId",requireAuth, async(req,res)=>{
   const conversationId = req.params.conversationId;
   const data = req.body.message;
   const myID = req.user.id;
   try {
       const createMessage = await prisma.message.create({
        data: {
          text: data,
          sender: {
            connect: { user_id: myID }
          },
          conversation: {
            connect: { id: conversationId }
          }
        }

     })
     res.status(200).json("Message delivered successfully")
     
   } catch (error) {
    console.log(error)
  }
  
})
module.exports = router;
