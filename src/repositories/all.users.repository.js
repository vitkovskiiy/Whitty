const prisma = require("../config/prisma.database");

class UsersRepository {
  async fetchAll(myId) {
    const findAll = prisma.user.findMany({
      where: {
        user_id: {
          not: parseInt(myId),
        },
      },
      select: {
        user_id: true,
        avatar: true,
        username: true,
      },
    });
    return findAll;
  }
  async findMe(user_id){
    const user = await prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
      select: {
        user_id: true,
        username: true,
        avatar: true,
        country: true,
      },
    });
    return user
  }
}

module.exports = new UsersRepository();
