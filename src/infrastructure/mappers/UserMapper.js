const UserFactory = require("../../domain/factories/UserFactory")


class UserMapper {
    static toDomain(prismaUser) {
        return UserFactory.reconstitute({
          id: prismaUser.user_id,
          username: prismaUser.username,
          avatar:prismaUser.avatar
        });
    }
    static toPersistence(domainUser) {
    return {
      username: domainUser.username,
      email: domainUser.email,
      avatar: domainUser.avatar,
    };
  }
}
module.exports = UserMapper;
