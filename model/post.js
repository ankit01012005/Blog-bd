const mongoose = require("mongoose")

const createSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    content:{
        type:String,
        require:true,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like"

    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"

    }]
})

module.exports = mongoose.model('Blog',createSchema)