
const express = require('express')
const router = express.Router()

const createBlog = require("../controllers/createBlog")
router.post('/post/create',createBlog)

const getBlog = require("../controllers/getBlog")
router.get('/post/getAll',getBlog)

const commentDown = require("../controllers/comments")
router.post('/comment/create',commentDown)

const  likePost = require('../controllers/likes')
console.log(likePost)
router.post('/likes/like',likePost)

const unlikePost = require('../controllers/unlike')
 router.post('/likes/unlike',unlikePost)



module.exports = router