const AuthService = require("../../application/services/auth.service");
const RegisterUserDTO = require("../dto/requests/RegisterUserDto");
const LoginUserDTO = require("../dto/requests/LoginUserDto");


class AuthController {
  async login(req, res, next) {
    try {
      const validateData = new LoginUserDTO(req.body);
      const LoginUser = await AuthService.login(validateData.username, validateData.password);

      res.cookie("jwt", LoginUser.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).json({ message: "Login successful", redirect: "/profile" });
    } catch (error) {
      next(error);
    }
  }
  async register(req, res, next) {
    try {
      const user = new RegisterUserDTO(req.body);
      console.log(user);
      const RegisterUser = await AuthService.register(user.username, user.password);

      res.cookie("jwt", RegisterUser.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Register successful", redirect: "/profile" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
