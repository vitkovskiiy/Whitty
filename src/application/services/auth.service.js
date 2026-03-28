const AuthRepository = require("../../infrastructure/repositories/auth.repository");
const bcrypt = require("bcrypt");
const jwt = require("../../infrastructure/utils/jwt.generate");

class AuthService {
  async login(username, password) {
    if (!username || !password) {
      throw new Error("Username or Password undefined");
    }

    const user = await AuthRepository.login(username);

    const isMatchPassword = bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      throw new Error("Password invalid,please try again");
    }
    const token = jwt.generateAccessToken(user.user_id);
    if (!token) {
      throw new Error("Error while generate token");
    }

    return { user, token };
  }

  async register(username, password) {
    if (!username || !password) {
      throw new Error("Username or Password undefined");
    }
    if (password.lenght < 8) {
      throw new Error("Password should be more than 8 words");
    }
    const findByUsername = AuthRepository.findByUsername(username);
    if (!findByUsername) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = AuthRepository.createUser(username, hashedPassword);
    if (!createUser) {
      throw new Error("Something happened when tried to create user");
    }
    return createUser;
  }
}

module.exports = new AuthService();
