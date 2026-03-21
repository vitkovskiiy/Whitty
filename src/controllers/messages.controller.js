const MessageService = require("../services/message.service");

class MessageController {
  async createMessage(req, res) {
    const conversationId = req.params.conversationId;
    const text = req.body.message;
    const senderId = req.user.id;
    console.log(text);
    const createMessage = await MessageService.createMessage(conversationId, text, senderId);
    res.status(200).json({ message: "Message was delivered" });
  }

  async allMessages(req, res) {
    try {
      const conversationId = req.params.conversationId;

      const allMessages = await MessageService.allMessages(conversationId);

      res.status(200).json(allMessages);
    } catch (error) {
      res.status(404).json({
        message: error,
      });
    }
  }
}

module.exports = new MessageController();
