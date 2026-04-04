const User = require("../entities/User");

class UserFactory {
  static createNew(username, avatar = "/uploads/avatars/default.png") {
    return new User({
      id: null,
      username: username,
      avatar: avatar,
      country_id: null,
      country_name:null,
    });
  }
  static reconstitute(prismaData) {
    return new User({ 
      id: prismaData.id,
      username: prismaData.username, 
      avatar: prismaData.avatar, 
      country_id: prismaData.country_id,
      country_name: prismaData.country_name 
    });
  }
}
module.exports = UserFactory;
