const { Router } = require("express");
const router = Router();
const express = require("express");
const app = express();
const prisma = require("../repositories/index");

router.get('/chatHistory', async (req,res) => {
    const myId = req.user.user_id
    try {
         const chatHistory = prisma.conversation.findMany({
             where: {
                participants:{
                    some: { user_id: myId }
                }
             },
             orderBy: {
                updatedAt: 'desc'
             },
             include:{
                participants: {
                    select: {
                    user_id: true,
                    username: true,
                    avatar: true
                 }    
                }
             }
         })
    } catch (e){
        console.log(e + "Something happened on chathistory");
    }
})