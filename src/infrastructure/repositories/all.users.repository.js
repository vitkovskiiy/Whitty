const prisma = require("../config/prisma.database");

class UsersRepository {
  async fetchAll(myId) {
    const findAll = await prisma.user.findMany({
      where: {
        user_id: {
          not: parseInt(myId),
        },
      }
    });
    return findAll;
  }
  async findMe(user_id){
    const user = await prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
      include: {
        country:true,
      }
      
    });
    return user
  }
}

module.exports = new UsersRepository();
