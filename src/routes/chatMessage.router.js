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
   const conversationID = req.params.conversationId;
   const cookies = req.cookies.jwt;
   const parse = jwt.decode(cookies);
   const myID = parse.id;
   const data = req.body;
   console.log(req);
   try {
       const createMessage = prisma.message.create({
        data: {
          conversationId: conversationID,
          text: data,
          senderId: myID,
        }
     })
     
   } catch (error) {
    throw new Error("Something happend when try to send message")
  }
  
})
module.exports = router;
