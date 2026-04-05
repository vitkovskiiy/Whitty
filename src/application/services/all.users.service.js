const User = require("../../domain/entities/User");
const { DomainError } = require("../../domain/error");
const UserRepository = require("../../infrastructure/repositories/all.users.repository")

class UsersService {
  constructor(){
    this.repository = new UserRepository();
  }
  async fetchAll(myId) {
    const findUsers = await this.repository.fetchAll(myId);
    if (!findUsers) {
      throw new DomainError("Error get all users");
    }
    return findUsers;
  }
  async findMe(user_id) {
    const findMe = await this.repository.findMe(user_id);
    if (!findMe) {
      throw new DomainError("User not found");
    }
    console.log(findMe)
    return findMe;
  }
}

module.exports = new UsersService();
