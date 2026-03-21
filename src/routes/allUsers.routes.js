const express = require("express");
const prisma = require("../repositories/index");
const router = express.Router();
const {requireAuth} = require("../middleware/authMiddleware")

router.get("/allusers", requireAuth,async (req, res) => {
  const myID = req.user.id;
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
