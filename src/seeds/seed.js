const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedDatabase () {
    await prisma.user.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.like.deleteMany({});
    await prisma.comment.deleteMany({});

}