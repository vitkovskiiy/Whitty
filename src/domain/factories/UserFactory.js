const User = require("../models/User")


class UserFactory { 
    static createNew({username,avatar = '/uploads/avatars/default.png'}){
        return new User({
            id: null,
            username: username,
            avatar: avatar,
        })
    }
    static reconstitute({ id, username, avatar,}) {
    return new User({ id, username, avatar});
  }
}
module.exports = UserFactory;