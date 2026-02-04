const express = require("express");
const prisma = require("../repositories/index");
const router = express.Router();

router.get("/allusers", async (req, res) => {
  const response = await prisma.user.findMany({
    select: {
      username: true
    },
  });
  res.send(response);
});
module.exports = router;
