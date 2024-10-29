const {Blog} = require('../models/blog.model')
async function createNewBlog(req,res) {

    const {title,body}= req.body

    const blog = await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageUrl:`/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
}

async function getAllBlogs(req,res) {

    const allBlogs = await Blog.find({})
    if(allBlogs.length===0){
        return res.send("No Blog to s")
    }

    return allBlogs
    
    
}
module.exports={createNewBlog,getAllBlogs}