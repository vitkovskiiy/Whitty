const UsersService = require("../../application/services/all.users.service");
const OutputUserDTO = require("../dto/response/outputUserDTO");

class UsersController {
  async allUsers(req, res, next) {
    try {
      const myId = req.user.id;
      const allUsers = await UsersService.fetchAll(myId);
      const parsedUsers = allUsers.map((user) => OutputUserDTO.fromDomain(user));
      res.status(200).json(parsedUsers);
    } catch (error) {
      next(error);
    }
  }

  async findMe(req, res, next) {
    try {
      const user_id = req.user.id;
      const me = await UsersService.findMe(user_id);
      const safeUser = OutputUserDTO.fromDomain(me);
      res.status(200).json(safeUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();
