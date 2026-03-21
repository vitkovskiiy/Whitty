const MessageRepository = require("../repositories/chat.message.repository");

class MessageService {
  async createMessage(conversationId, senderId, text) {
    console.log(text + "service");
    if (text === "") {
      throw new Error("Text field is empty");
    }
    const createMessage = await MessageRepository.createMessage(conversationId, text, senderId);
    if (!createMessage) {
      throw new Error("Error: Creating message");
    }
    return createMessage;
  }
  async allMessages(conversationId) {
    const allMessages = await MessageRepository.allMessages(conversationId);
    if (!allMessages) {
      throw new Error("Can't fetch messages from this conversation");
    }
    return allMessages;
  }
}

module.exports = new MessageService();
