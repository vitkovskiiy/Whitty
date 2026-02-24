const jwt = require("jsonwebtoken")

const parseMyId = (req,res,next) => {
    const cookies = req.cookies.jwt;
       const token = jwt.decode(cookies);
       const myID = token.id;
       res.json({message:"This is your id", myID})
}

module.exports = {parseMyId};