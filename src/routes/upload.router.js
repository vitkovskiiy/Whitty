const { Router } = require("express");
const router = Router();
const fileMiddleware = require("../middleware/fileMiddleware");
const { requireAuth } = require("../middleware/authMiddleware");
const UploadController = require("../controllers/upload.avatar.controller");

router.post("/upload-avatar", requireAuth, fileMiddleware.single("avatar"),UploadController);



module.exports = router;
