const express = require("express");
const prisma = require("../repositories/index");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/messages/:conversationId", async (req, res) => {
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

router.post("/messages/:conversationId", async(req,res)=>{
   const conversationId = req.params.conversationId;
   const cookies = req.cookies.jwt;
   const parse = jwt.decode(cookies);
   const myID = parse.id;
   const data = req.body.message;
   console.log(data, myID, conversationId);
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
