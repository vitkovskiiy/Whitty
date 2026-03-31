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
      id: domainUser.id,
      username: domainUser.username,
      avatar: domainUser.avatar,

    };
  }
}
module.exports = UserMapper;
