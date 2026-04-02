const User = require("../models/User");

class UserFactory {
  static createNew({ username, avatar = "/uploads/avatars/default.png" }) {
    return new User({
      id: null,
      username: username,
      avatar: avatar,
      country_id: null,
      country_name:null,
    });
  }
  static reconstitute({ id, username, avatar,country_id,country_name }) {
    return new User({ id, username, avatar, country_id, country_name });
  }
}
module.exports = UserFactory;
