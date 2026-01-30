const express = require("express");
const prisma = require("../repositories/index");
const router = express.Router();

router.get("/allusers", async (req, res) => {
  const response = await prisma.user.findMany();
  res.status(200).send(response);
});
module.exports = router;
