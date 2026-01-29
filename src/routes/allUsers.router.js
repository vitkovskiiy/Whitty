const express = require("express");
const prisma = require("../repositories/index");
const router = express.Router();



router.get('/allusers', async (req,res) => {
    const response = await prisma.user.findMany();
    const users = await response.json();
    res.json(users);
});
module.exports = router;