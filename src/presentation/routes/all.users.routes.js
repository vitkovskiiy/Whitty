const express = require("express");
const router = express.Router();
const {requireAuth} = require("../middleware/authMiddleware")
const UsersController = require("../controllers/all.users.controller")

router.get("/allusers", requireAuth,UsersController.allUsers)


module.exports = router;
