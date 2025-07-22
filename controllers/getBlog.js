const Blog = require("../model/post")

const getBlog = async (req,res)=>{
    try{

        
        const response = await Blog.find({}).populate("comments").exec()
        
        res.status(200).json({
            success:true,
            data : response,
            message : "Got the All Blogs"
        })
    }
    catch(error){
        console.error(error)
        console.log(error)
        res.status(500).json({
            success:false,
            data:"Inter Server failure",
            message: error.message
        })

    }

}

module.exports = getBlog