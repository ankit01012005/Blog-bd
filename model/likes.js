const mongoose = require("mongoose")

// schema handler
const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    user:{
        type:String,
        require:true,
    }
})

module.exports = mongoose.model('Like',likeSchema)