const Blog = require("../model/post")

const createBlog = async (req,res)=>{
    try{
        const {title,content} = req.body;

        const postObject = new Blog({title,content})
        const response = await postObject.save()
        // const updatedResponse = response.populate("comments").exec()
        
        res.status(200).json({
            success:true,
            data : response,
            message : "Blog created Successfully"
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

module.exports = createBlog