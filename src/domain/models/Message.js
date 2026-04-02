class Message {
  constructor({ text, senderId, conversationId }) {
    this.senderID = senderId,
    this.conversationID = conversationId,
    this.text = text;
  }
}

module.exports = Message;
