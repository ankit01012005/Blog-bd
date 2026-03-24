
const express = require('express')
const router = express.Router()

// Auth imports
const { signup, login, logout } = require("../controllers/auth")
const authMiddleware = require("../middleware/auth")

// Auth Routes (Public)
router.post('/auth/signup', signup)
router.post('/auth/login', login)
router.post('/auth/logout', logout)

// Blog Routes (Protected)
const createBlog = require("../controllers/createBlog")
router.post('/post/create', authMiddleware, createBlog)

const getBlog = require("../controllers/getBlog")
router.get('/post/getAll', getBlog)

const commentDown = require("../controllers/comments")
router.post('/comment/create', authMiddleware, commentDown)

const likePost = require('../controllers/likes')
router.post('/likes/like', authMiddleware, likePost)

const unlikePost = require('../controllers/unlike')
router.post('/likes/unlike', authMiddleware, unlikePost)

module.exports = router
