const { ValidationError } = require("../../domain/error")

class RegisterUserDTO {
    constructor(data){
       this.username = data.username.trim(),
       this.password = data.password
    }
    validate(){
        if(!this.username || this.username.length < 3){
            throw new ValidationError("Username should be more than 3 chars")
        }
        if(!this.password || this.password.length < 8) {
            throw new ValidationError("Password lenght should to be more than 8 chars")
        }
        return { username: this.username, password: this.password }
    }

}

module.exports = RegisterUserDTO;