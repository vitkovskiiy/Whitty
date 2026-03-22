const  UploadAvatarService = require("../services/avatar.upload.service")

 class UploadController {
        async uploadAvatar(req,res) {
            try {
                const userId = req.user.id;
                const avatarUrl = `/uploads/avatars/${req.file.filename}`;
                
                const uploadNewAvatar = await UploadAvatarService.uploadNewAvatar(userId,avatarUrl);
                
                res.status(201).json({
                    message: "Avatar updated", 
                    avatar:uploadNewAvatar,
                })
            } catch(error) {
                 res.status(400).json({error: error.message})
            }
        }
 }


module.exports = new UploadController();