const Like = require('../model/likes')
const Post = require('../model/post')

const likePost = async (req , res)=>{
    try{
        const {post,user} = req.body;

        const likeObject = new Like({post,user})

        const savedLike = await likeObject.save();

        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true})
                                                .populate('likes')
                                                .exec()
        res.status(200).json({
            Post:updatedPost
        })

    }

    catch(error){
        res.status(500).json({
            error:"error in Liking Post"
        })

    }
}
module.exports = likePost
