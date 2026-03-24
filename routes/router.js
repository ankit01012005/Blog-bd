
const express = require('express')
const router = express.Router()

// Middleware imports
const authMiddleware = require("../middleware/auth")
const { signupValidator, loginValidator, createBlogValidator, createCommentValidator, likeValidator } = require("../middleware/validators")

// Auth imports
const { signup, login, logout } = require("../controllers/auth")

// Auth Routes (Public)
router.post('/auth/signup', signupValidator, signup)
router.post('/auth/login', loginValidator, login)
router.post('/auth/logout', logout)

// Blog Routes
const createBlog = require("../controllers/createBlog")
router.post('/post/create', authMiddleware, createBlogValidator, createBlog)

const getBlog = require("../controllers/getBlog")
router.get('/post/getAll', getBlog)

// Comment Routes
const commentDown = require("../controllers/comments")
router.post('/comment/create', authMiddleware, createCommentValidator, commentDown)

// Like Routes
const likePost = require('../controllers/likes')
router.post('/likes/like', authMiddleware, likeValidator, likePost)

const unlikePost = require('../controllers/unlike')
router.post('/likes/unlike', authMiddleware, likeValidator, unlikePost)

module.exports = router
