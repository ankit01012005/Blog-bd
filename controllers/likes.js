const Like = require('../model/likes')
const Post = require('../model/post')

const likePost = async (req, res) => {
    try {
        const { post, user } = req.body

        // Verify post exists
        const postExists = await Post.findById(post)
        if (!postExists) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        // Check if user already liked the post
        const existingLike = await Like.findOne({ post, user })
        if (existingLike) {
            return res.status(409).json({
                success: false,
                message: "User has already liked this post",
            })
        }

        // Create like
        const like = new Like({ post, user })
        const savedLike = await like.save()

        // Update post with new like
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { likes: savedLike._id } },
            { new: true }
        )
            .populate('likes')
            .exec()

        res.status(201).json({
            success: true,
            message: "Post liked successfully",
            data: {
                likeId: savedLike._id,
                post: updatedPost
            }
        })
    } catch (error) {
        console.error("Like post error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to like post",
            error: error.message,
        })
    }
}

module.exports = likePost
