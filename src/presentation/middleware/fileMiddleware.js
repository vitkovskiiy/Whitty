
const multer = require("multer");
const path = require("path");

const maxSize = 4000000;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (req.headers['content-length']> maxSize) {
      cb(new Error("File should be less than 4mb"))
    }
    cb(null, path.join(__dirname, "../../uploads/avatars"));
  },
  filename(req, file, cb) {
     cb(null, Date.now() + "-" + file.originalname);
  },
  onFileUploadStart: function (file, req, res) {},
});

const types = ["image/png", "image/jpeg", "image/jpg"];
const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
