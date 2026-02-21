const express = require("express");
const prisma = require("../repositories/index");
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
module.exports = router;
