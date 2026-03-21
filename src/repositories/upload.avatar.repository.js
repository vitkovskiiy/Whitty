const prisma = require("../config/prisma.database");


class UploadAvatar {
    async saveAvatar(userId,avatarUrl){
        const updateAvatar = await prisma.user.update({
            where: {
                user_id : userId
            },
            data: {
                avatar : avatarUrl
            }
        })
        return updateAvatar;
    }

    async findOldAvatar(userId){
        const deleteOldAvatar = await prisma.user.findUnique({
            where: {
                user_id: userId,
            },
            select: {
                avatar: true,
            }
        })
        return deleteOldAvatar;
    }
}

module.exports = new UploadAvatar();
