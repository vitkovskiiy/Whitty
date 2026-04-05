const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const MessagesController = require("../controllers/messages.controller");

router.get("/messages/:conversationId", requireAuth,MessagesController.allMessages)
  
router.post("/messages/:conversationId", requireAuth,MessagesController.createMessage);

module.exports = router;
