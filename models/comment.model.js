const { Schema, mongoose } = require('mongoose');
const { Blog } = require('./blog.model');



const commentSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog",
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})


const Comment = mongoose.model("comment",commentSchema)

module.exports = {Comment}