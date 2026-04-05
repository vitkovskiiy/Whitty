const MessageService = require("../../application/services/message.service");
const { DomainError, NotFoundError } = require("../../domain/error");

class MessageController {
  async createMessage(req, res, next) {
    try {
      const conversationId = req.params.conversationId;
      const text = req.body.message;
      const senderId = req.user.id;
      const createMessage = await MessageService.createMessage(conversationId, text, senderId);
      res.status(200).json({ message: "Message was delivered" });
    } catch (error) {
      next(error);
    }
  }

  async allMessages(req, res, next) {
    try {
      const conversationId = req.params.conversationId;

      const allMessages = await MessageService.allMessages(conversationId);

      res.status(200).json(allMessages);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MessageController();
