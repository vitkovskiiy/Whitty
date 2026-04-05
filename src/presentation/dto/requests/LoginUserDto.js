const { DomainError } = require("../../../domain/error");

class LoginUserDTO {
  constructor(data) {
    this.username = data.username ? data.username.trim() : null;
    this.password = data.password;
  }

  validate() {
    if (!this.username) {
      throw new DomainError("Username is required");
    }
    if (!this.password) {
      throw new DomainError("Password is required");
    }
    if(this.password.length < 7 ){
      throw new DomainError("Password should be more than 7 chars");
    }

    return { username: this.username, password: this.password };
  }
}

module.exports = LoginUserDTO;
