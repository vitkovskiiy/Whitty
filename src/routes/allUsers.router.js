const express = require("express");
const prisma = require("../repositories/index");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {requireAuth} = require("../middleware/authMiddleware")

router.get("/allusers", requireAuth,async (req, res) => {
  const myID = req.user.id;
  const parse = jwt.decode(myID)
  console.log(parse);
  const response = await prisma.user.findMany({
    where:{
      user_id: { not: parseInt(myID) }
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
