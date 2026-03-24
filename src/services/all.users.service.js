const UsersRepository = require("../repositories/all.users.repository");

class UsersService {
  async fetchAll(myId) {
    const findUsers = UsersRepository.fetchAll(myId);
    if (!findUsers) {
      throw new Error("Error get all users");
    }
  }
  async findMe(user_id) {
    const findMe = UsersRepository.findMe(user_id);
    if (!findMe) {
      throw new Error("User not found");
    }
    return findMe;
  }
}

module.exports = new UsersService();
