const {Comment} = require('../models/comment.model')
async function createComment(req,res) {

    const comment = await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
    
}


module.exports = {createComment}