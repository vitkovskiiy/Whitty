const PostRepository = require("../repositories/post.repository")


class PostService{
    async createPost(userId, avatarUrl, caption, content) {
        console.log(userId, avatarUrl, caption, content);
    }

    async getAllPosts(){
        const getAllPosts = PostRepository.allPosts()
        return getAllPosts;
    }
}


module.exports = new PostService();