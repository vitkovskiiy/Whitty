const UploadAvatar = require("../../infrastructure/repositories/upload.avatar.repository");
const fs = require("fs");
const path = require("path")

class UploadAvatarService {
  async uploadNewAvatar(userId, avatarUrl) {
    const oldAvatarPath = await UploadAvatar.findOldAvatar(userId);
    
    if (!oldAvatarPath) {
      throw new Error("User not found");
    }

    const uploadAvatar = await UploadAvatar.saveAvatar(userId, avatarUrl);
    if (!uploadAvatar) {
      throw new Error("Error while uploading avatar");
    }

    if (oldAvatarPath.avatar && !oldAvatarPath.avatar.includes("default.jpg")) {
      const filePathToDelete = path.join(__dirname, "../../", oldAvatarPath.avatar);

      fs.unlink(filePathToDelete, (err) => {
        if (err) console.error("⚠️ Failed to delete old avatar:", err.message);
      });
    }
    return uploadAvatar;
  }
}

module.exports = new UploadAvatarService();
