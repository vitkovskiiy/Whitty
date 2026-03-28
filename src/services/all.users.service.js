const UsersRepository = require("../repositories/all.users.repository");

class UsersService {
  async fetchAll(myId) {
    const findUsers = await UsersRepository.fetchAll(myId);
    if (!findUsers) {
      throw new Error("Error get all users");
    }
    return findUsers;
  }
  async findMe(user_id) {
    const findMe = await UsersRepository.findMe(user_id);
    if (!findMe) {
      throw new Error("User not found");
    }
    return findMe;
  }
}

module.exports = new UsersService();
