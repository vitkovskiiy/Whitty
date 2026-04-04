const AuthService = require("../../application/services/auth.service");
const RegisterUserDTO = require("../dto/requests/RegisterUserDto");
const LoginUserDTO = require("../dto/requests/LoginUserDto");
const { DomainError, NotFoundError } = require("../../domain/error");

class AuthController {
  async login(req, res) {
    try {
      const LoginDto = await new LoginUserDTO(req.body);
      const validateUser = await LoginDto.validate();
      const user = await AuthService.login(
        validateUser.username,
        validateUser.password,
      );

      res.cookie("jwt", user.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).json({ message: "Login successful", redirect: "/profile" });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      }
      if (error instanceof DomainError) {
        res.status(400).json({ message: error.message });
      }
      console.log(error.message);
      res.status(500).json({ message: "Error on server side" });
    }
  }

  async register(req, res) {
    try {
      const dto = new RegisterUserDTO(req.body);
      const validateUser = dto.validate();

      const registerUser = await AuthService.register(
        validateUser.username,
        validateUser.password,
      );

      res.cookie("jwt", registerUser.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Register successful", redirect: "/profile" });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      }
      if (error instanceof DomainError) {
        res.status(400).json({ message: error.message });
      }
      console.log(error.message);
      res.status(500).json({ message: "Error on server side" });
    }
  }
}

module.exports = new AuthController();
