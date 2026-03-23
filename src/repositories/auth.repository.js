const prisma = require("../config/prisma.database");

class AuthRepository {
  async login(username) {
    const login = await prisma.user.findUnique({
      where: {
        username: username,
      },
  })
  return login;
}
  async findByUsername(username) {
    return await prisma.user.findUnique({
      where: { username } 
    });
  }
  async register(username,password){
      const createUser = await prisma.user.create({
        data: {
          username:username,
          password:password,
        }
      })
      return createUser;
  }
}

module.exports = new AuthRepository();