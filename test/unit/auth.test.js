
const AuthService = require("../../src/application/services/auth.service");
const AuthRepository = require("../../src/infrastructure/repositories/auth.repository");
const UserMapper = require("../../src/infrastructure/mappers/UserMapper");
const bcrypt = require("bcrypt");
const jwt = require("../../src/infrastructure/utils/jwt.generate");
jest.mock('../../src/infrastructure/repositories/auth.repository', () => {
  return {
    findByUsername: jest.fn(),
    createUser: jest.fn(),
    login: jest.fn()
  };
});

jest.mock('bcrypt');
jest.mock('../../src/infrastructure/utils/jwt.generate');
jest.mock('../../src/infrastructure/mappers/UserMapper');

describe("AuthService Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Метод register()", () => {
    it("Успішна реєстрація нового користувача", async () => {
      AuthRepository.findByUsername.mockResolvedValue(null); 
      bcrypt.hash.mockResolvedValue("hashed_password_123"); 

      const fakeCreatedUser = { user_id: 1, username: "sayzy" };
      AuthRepository.createUser.mockResolvedValue(fakeCreatedUser);

      const fakeMappedUser = { id: 1, username: "sayzy"};
      UserMapper.toDomain.mockReturnValue(fakeMappedUser);
      const result = await AuthService.register("sayzy", "password123");
      expect(AuthRepository.findByUsername).toHaveBeenCalledWith("sayzy");
      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(AuthRepository.createUser).toHaveBeenCalledWith(
        "sayzy",
        "hashed_password_123",
      );
      expect(result).toEqual(fakeMappedUser);
    });

    it("Помилка: користувач вже існує", async () => {
      AuthRepository.findByUsername.mockResolvedValue({
        user_id: 1,
        username: "sayzy",
      });

      await expect(
        AuthService.register("sayzy", "password123"),
      ).rejects.toThrow("User already exists");
      expect(AuthRepository.createUser).not.toHaveBeenCalled();
    });

    it("Помилка: пароль коротший за 8 символів", async () => {
      await expect(AuthService.register("sayzy", "123")).rejects.toThrow(
        "Password should be more than 8 words",
      );
    });
  });
});
