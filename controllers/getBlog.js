const Blog = require("../model/post")

const getBlog = async (req, res) => {
    try {
        const blogs = await Blog.find({})
            .populate("comments")
            .populate("likes")
            .exec()

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No blogs found",
                data: []
            })
        }

        res.status(200).json({
            success: true,
            message: "Blogs retrieved successfully",
            count: blogs.length,
            data: blogs
        })
    } catch (error) {
        console.error("Get blogs error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch blogs",
            error: error.message,
        })
    }
}

module.exports = getBlog