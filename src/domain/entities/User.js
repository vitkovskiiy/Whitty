class User {
  constructor(user_id, username, avatar, country_id, country_name) {
  (this.username = username,
   this.user_id = user_id,
   this.avatar = avatar,
   this.country_id = country_id,
   this.country_name = country_name);
  }

  async getUsername(){
  
  }

  async getUserCountryName(){
    return this.country_name
  }
}

module.exports = User;
