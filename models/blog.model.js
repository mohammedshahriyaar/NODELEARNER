const { Schema, mongoose } = require('mongoose');
const blogSchema = Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true,
    },
    coverImageUrl:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const Blog = mongoose.model("blog",blogSchema)

module.exports = {Blog}


