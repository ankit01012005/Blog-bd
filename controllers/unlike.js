
const Like = require('../model/likes')
const Post = require('../model/post')


const unlikePost = async (req ,res)=>{

    try{
        const{post,like} = req.body
        console.log(post)
        console.log(like)

        const updatedUnlike = await Like.findByIdAndDelete(like)
        console.log(updatedUnlike)
        const updatedPost = await Post.findOneAndUpdate({_id:post},{$pull:{likes:updatedUnlike._id}},{new:true})
        console.log(updatedUnlike)

        res.status(200).json({
            post:updatedPost,
            message : "Unliked Successfully." 
        })
    }

    catch(error){
        res.send({
             error:"Error in Uliking post"
        })
       

    }


}

module.exports = unlikePost