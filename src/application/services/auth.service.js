const AuthRepository = require("../../infrastructure/repositories/auth.repository");
const bcrypt = require("bcrypt");
const jwt = require("../../infrastructure/utils/jwt.generate");
const UserMapper = require("../../infrastructure/mappers/UserMapper")
const {DomainError} = require("../../domain/error");

class AuthService {
  async login(username, password) {
    const user = await AuthRepository.login(username);
    
    if (!user) {
      throw new Error("Can't find user");
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      throw new DomainError("Password invalid,please try again");
    }
    const token = await jwt.generateAccessToken(user.user_id);
    if (!token) {
      throw new DomainError("Error while generate token");
    }
    const mappedUser = UserMapper.toDomain(user);
    return { mappedUser, token };
  }

  async register(username, password) {
    
    const findByUsername = await AuthRepository.findByUsername(username,password);
    if (findByUsername) {
      throw new DomainError("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await AuthRepository.register(username, hashedPassword);
    if (!createUser) {
      throw new DomainError("Something happened when tried to create user");
    }
    return UserMapper.toDomain(createUser);
  }
}

module.exports = new AuthService();
