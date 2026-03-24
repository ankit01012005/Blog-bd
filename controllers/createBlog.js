const Blog = require("../model/post")

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body

        // Create new blog
        const blog = new Blog({ title, content })
        const savedBlog = await blog.save()

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: {
                id: savedBlog._id,
                title: savedBlog.title,
                content: savedBlog.content,
                likes: savedBlog.likes,
                comments: savedBlog.comments,
                createdAt: savedBlog.createdAt
            }
        })
    } catch (error) {
        console.error("Create blog error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to create blog",
            error: error.message,
        })
    }
}

module.exports = createBlog