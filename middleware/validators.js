const { body, validationResult } = require("express-validator")

// Validation middleware to check errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
        })
    }
    next()
}

// Auth Validators
const signupValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email")
        .trim()
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("confirmPassword")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match"),
    validateRequest
]

const loginValidator = [
    body("email")
        .trim()
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .notEmpty().withMessage("Password is required"),
    validateRequest
]

// Blog Validators
const createBlogValidator = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
    body("content")
        .trim()
        .notEmpty().withMessage("Content is required")
        .isLength({ min: 10 }).withMessage("Content must be at least 10 characters"),
    validateRequest
]

// Comment Validators
const createCommentValidator = [
    body("post")
        .notEmpty().withMessage("Post ID is required")
        .isMongoId().withMessage("Invalid post ID"),
    body("user")
        .trim()
        .notEmpty().withMessage("User is required"),
    body("body")
        .trim()
        .notEmpty().withMessage("Comment body is required")
        .isLength({ min: 1 }).withMessage("Comment cannot be empty"),
    validateRequest
]

// Like/Unlike Validators
const likeValidator = [
    body("post")
        .notEmpty().withMessage("Post ID is required")
        .isMongoId().withMessage("Invalid post ID"),
    body("user")
        .trim()
        .notEmpty().withMessage("User is required"),
    validateRequest
]

module.exports = {
    signupValidator,
    loginValidator,
    createBlogValidator,
    createCommentValidator,
    likeValidator,
}
