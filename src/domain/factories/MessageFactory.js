const Message = require("../models/Message")


class MessageFactory {
  static createNew({ senderId, conversationId,text}) {
    return new Message({
      senderId: senderId,
      conversationId: conversationId,
      text: text,
    });
  }
  static reconstitute({ senderId, conversationId, text }) {
    return new Message({ senderId, conversationId, text });
  }
}
module.exports = MessageFactory;