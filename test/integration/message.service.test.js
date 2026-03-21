const MessageService = require("../../src/services/message.service");
const MessageRepository = require("../../src/repositories/chat.message.repository");

jest.mock("../../src/repositories/chat.message.repository");

describe("MessageService", () => {
  let messageService;

  beforeEach(() => {
        messageService = new MessageService();
    
    jest.clearAllMocks();
  });

  it("должен успешно создавать сообщение, если текст не пустой", async () => {
    
    const mockConversationId = "conv-123";
    const mockText = "Привет, как дела?";
    const mockSenderId = "user-777";

    const expectedResult = { id: 1, text: mockText };
    MessageRepository.createMessage.mockResolvedValue(expectedResult);

    await messageService.createMessage(mockConversationId, mockText, mockSenderId);

    expect(MessageRepository.createMessage).toHaveBeenCalledTimes(1);
    
    expect(MessageRepository.createMessage).toHaveBeenCalledWith(
      mockConversationId, 
      mockText, 
      mockSenderId
    );
  });

  
  it("не должен вызывать репозиторий, если текст пустой", async () => {
    const mockConversationId = "conv-123";
    const mockText = ""; 
    const mockSenderId = "user-777";

    await messageService.createMessage(mockConversationId, mockText, mockSenderId);
    expect(MessageRepository.createMessage).
    expect(MessageRepository.createMessage).not.toHaveBeenCalled();
  });
});