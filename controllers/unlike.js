const Like = require('../model/likes')
const Post = require('../model/post')

const unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body

        // Verify post exists
        const postExists = await Post.findById(post)
        if (!postExists) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        // Verify like exists
        const likeExists = await Like.findById(like)
        if (!likeExists) {
            return res.status(404).json({
                success: false,
                message: "Like not found",
            })
        }

        // Delete like
        await Like.findByIdAndDelete(like)

        // Update post by removing like
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $pull: { likes: like } },
            { new: true }
        )
            .populate('likes')
            .exec()

        res.status(200).json({
            success: true,
            message: "Post unliked successfully",
            data: {
                post: updatedPost
            }
        })
    } catch (error) {
        console.error("Unlike post error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to unlike post",
            error: error.message,
        })
    }
}

module.exports = unlikePost


module.exports = unlikePost