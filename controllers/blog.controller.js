const {Blog} = require('../models/blog.model')
const { Comment } = require('../models/comment.model')
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

async function getBlogById(req,res) {
        const id = req.params.id;
        const blog = await Blog.findById(id).populate("createdBy")
        const comments = await Comment.find({blogId:id}).populate('createdBy')
        // console.log(blog)
        console.log('comments',comments)
        if(!blog) return res.status(404).json({msg:"Blog not found"});
        
        return res.render(`blog`,{
            user:req.user,
            blog:blog,
            comments:comments
        })
}
module.exports={createNewBlog,getAllBlogs,getBlogById}