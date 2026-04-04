const AuthRepository = require("../../infrastructure/repositories/auth.repository");
const bcrypt = require("bcrypt");
const jwt = require("../../infrastructure/utils/jwt.generate");
const UserMapper = require("../../infrastructure/mappers/UserMapper")
const {} = require("../../domain/error");

class AuthService {
  async login(username, password) {
    const user = await AuthRepository.login(username);
    
    if (!user) {
      throw new Error("Can't find user");
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      throw new InvalidPasswordError("Password invalid,please try again");
    }
    const token = await jwt.generateAccessToken(user.user_id);
    if (!token) {
      throw new TokenCreateError("Error while generate token");
    }
    const mappedUser = UserMapper.toDomain(user);
    return { mappedUser, token };
  }

  async register(username, password) {
    if (!username || !password) {
      throw new Error("Username or Password undefined");
    }
    if (password.length < 8) {
      throw new Error("Password should be more than 8 words");
    }
    const findByUsername = await AuthRepository.findByUsername(username);
    if (findByUsername) {
      throw new UserAlreadyExistsError("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await AuthRepository.register(username, hashedPassword);
    if (!createUser) {
      throw new Error("Something happened when tried to create user");
    }
    return UserMapper.toDomain(createUser);
  }
}

module.exports = new AuthService();
