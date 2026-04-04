const MessageRepository = require("../../infrastructure/repositories/chat.message.repository");
const { DomainError, NotFoundError } = require("../../domain/error");

class MessageService {
  async createMessage(conversationId, senderId, text) {
    try {
      if (text === "") {
        throw new DomainError("Text field is empty");
      }
      const createMessage = await MessageRepository.createMessage(
        conversationId,
        text,
        senderId,
      );
      if (!createMessage) {
        throw new NotFoundError("Error: Creating message");
      }
    } catch (error) {}
    return createMessage;
  }
  async allMessages(conversationId) {
    const allMessages = await MessageRepository.allMessages(conversationId);
    if (!allMessages) {
      throw new NotFoundError("Can't fetch messages from this conversation");
    }
    return allMessages;
  }
}

module.exports = new MessageService();
