const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const messagesController = require("../controllers/messages.controller");

router.get("/messages/:conversationId", requireAuth,messagesController.allMessages)
  
router.post("/messages/:conversationId", requireAuth,messagesController.createMessage);

module.exports = router;
