const MessageService = require("../../application/services/message.service");
const { DomainError, NotFoundError } = require("../../domain/error");

class MessageController {
  async createMessage(req, res) {
    try {
      const conversationId = req.params.conversationId;
      const text = req.body.message;
      const senderId = req.user.id;
      const createMessage = await MessageService.createMessage(
        conversationId,
        text,
        senderId,
      );
      res.status(200).json({ message: "Message was delivered" });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof DomainError) {
        return res.status(400).json({ message: error.message });
      }
      console.log(error.message);
      return res.status(500).json({ message: "Error on server side" });
    }
  }

  async allMessages(req, res) {
    try {
      const conversationId = req.params.conversationId;

      const allMessages = await MessageService.allMessages(conversationId);

      res.status(200).json(allMessages);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof DomainError) {
        return res.status(400).json({ message: error.message });
      }
      console.log(error.message);
      res.status(500).json({ message: "Error on server side" });
    }
  }
}

module.exports = new MessageController();
