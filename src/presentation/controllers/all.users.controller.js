const UsersService = require("../../application/services/all.users.service")


class UsersController {
    async allUsers(req,res){
      const myId = req.user.id;
      const allUsers = await UsersService.fetchAll(myId)

      if(!allUsers){
        return res.status(500).json({
            message:"Error load all users"
        })
      }
      res.status(200).json(allUsers);
    }
    async findMe(req,res){
      const user_id = req.user.id;

      const findMe = await UsersService.findMe(user_id)
      if(!findMe){
         return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(findMe)
    }
}
module.exports = new UsersController();