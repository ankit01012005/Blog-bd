const Comment = require('../model/comments')
const Post = require('../model/post')

const createComment = async (req,res)=>{
    try{

            //fetching data though req
        const {post,user,body} = req.body

            //making a object of comments
        const comment = new Comment( {post,user,body})

             //inserting the whole comment object with other method od inserting
         const savedcomment = await comment.save();

            // also updated the comment from the post. //this is new :true will give up the updated post // this push is for pushing that commenty in the post
        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{comments : savedcomment._id}},{new:true})
                                        .populate("comments")//this poppulates give us the full comment description intead of only comment id
                                        .exec();
    res.status(200).json({
        success:true,
        data:updatedPost,
        message:"Comment added succefully"
    })
}

    
    catch(error){
        res.status(500).json({
            success:false,
            message:`Internal Server error is ${error}`
        })

    }
}
module.exports = createComment