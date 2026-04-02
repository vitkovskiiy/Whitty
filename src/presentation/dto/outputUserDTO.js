class OutputUserDTO {
  static fromDomain(user) {
    return {
      id: user.user_id, 
      name: user.username,
      avatar: user.avatar,
      country_id: user.country_id,
      country_name: user.country.country_name,
    };
  }
}


module.exports = OutputUserDTO;
