const express = require("express");
const prisma = require("../repositories/index");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/allusers", async (req, res) => {
  const myID = req.cookies.jwt
  const parse = jwt.decode(myID)
  console.log(parse);
  const response = await prisma.user.findMany({
    omit:{
      user_id : parse
    },
    select: {
      username: true,
      user_id: true,
      avatar: true
    },
  });
  res.send(response);
});
module.exports = router;
