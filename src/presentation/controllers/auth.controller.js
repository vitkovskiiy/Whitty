const AuthService = require("../../application/services/auth.service");

class AuthController {
  async login(req, res) {
    const { username, password } = req.body;

    const user = await AuthService.login(username, password);
    if(!user){
      res.status(500).json({ message: "Server throwed error while logging" });
    }
    console.log(user);
    
    res.cookie("jwt", user.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", redirect: "/profile" });
  }

  async register(req,res){
    const { username, password } = req.body;
    const regiterUser = await AuthService.register(username,password);
    if(!regiterUser) {
      res.status(500).json({ message: "Server throwed error while register user" });
    }
    res.cookie("jwt", regiterUser.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Register successful", redirect: "/profile" });
  
  }
}

module.exports = new AuthController();
