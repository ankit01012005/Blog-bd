const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided. Please login.",
            })
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
            error: error.message,
        })
    }
}

module.exports = authMiddleware
