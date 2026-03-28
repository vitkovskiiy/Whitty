const prisma = require("../config/prisma.database");

class MessageRepository {
  async createMessage(conversationId, senderId, text) {
    const createMessage = await prisma.message.create({
      data: {
        text: text,
        sender: {
          connect: { user_id: senderId },
        },
        conversation: {
          connect: { id: conversationId },
        },
      },
    });
    return createMessage;
  }

  async allMessages(conversationId) {
    const fetchMessages = await prisma.conversation.findUnique({
      where: {
        conversationId: conversationId,
      },
      select: {
        participants: true,
        messages: true,
      },
    });
    return fetchMessages;
  }
}
module.exports = new MessageRepository();
