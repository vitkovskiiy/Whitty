class User {
  constructor({ user_id, username, avatar, country_id, country_name }) {
    ((this.username = username),
      (this.user_id = user_id),
      (this.avatar = avatar),
      (this.country.id = country_id),
      (this.country.name = country_name));
  }
}

module.exports = User;
