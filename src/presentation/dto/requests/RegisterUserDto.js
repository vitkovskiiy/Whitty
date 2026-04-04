const { DomainError } = require("../../../domain/error");

class RegisterUserDTO {
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

    return { username: this.username, password: this.password };
  }
}

module.exports = RegisterUserDTO;
