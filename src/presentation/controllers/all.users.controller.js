const UsersService = require("../../application/services/all.users.service");
const { DomainError, NotFoundError } = require("../../domain/error");
const OutputUserDTO = require("../../presentation/dto/outputUserDTO")

class UsersController {
  async allUsers(req, res) {
    try {
      const myId = req.user.id;
      const allUsers = await UsersService.fetchAll(myId);
      const parseUserFormat = allUsers.map(user => OutputUserDTO.fromDomain(user));
      res.status(200).json(parseUserFormat);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(409).json({ message: error.message });
      }
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      console.error("[Controller] Unexpected error:", error);
      return res.status(500).json({ message: "Error on server side" });
    }
  }
  async findMe(req, res) {
    try {
      const user_id = req.user.id;
      const me = await UsersService.findMe(user_id);
      const safeUser = await OutputUserDTO.fromDomain(me);
      res.status(200).json(safeUser);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(409).json({ message: error.message });
      }
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }

      console.error("[Controller] Unexpected error:", error);
      return res.status(500).json({ message: "Error on server side" });
    }
  }
}

module.exports = new UsersController();
