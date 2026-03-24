const Comment = require('../model/comments')
const Post = require('../model/post')

const createComment = async (req, res) => {
    try {
        const { post, user, body } = req.body

        // Verify post exists
        const postExists = await Post.findById(post)
        if (!postExists) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        // Create comment
        const comment = new Comment({ post, user, body })
        const savedComment = await comment.save()

        // Update post with new comment
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { comments: savedComment._id } },
            { new: true }
        )
            .populate("comments")
            .exec()

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            data: {
                commentId: savedComment._id,
                post: updatedPost
            }
        })
    } catch (error) {
        console.error("Create comment error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to add comment",
            error: error.message,
        })
    }
}

module.exports = createComment