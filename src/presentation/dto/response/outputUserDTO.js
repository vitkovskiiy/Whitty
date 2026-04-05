class OutputUserDTO {
  static fromDomain(user) {
    return {
      id: user.user_id, 
      username: user.username,
      avatar: user.avatar,
      country_id: user.country_id,
    };
  }
}


module.exports = OutputUserDTO;
