const express = require('express');
const router = express.Router();
const path = require('path')

const {createNewBlog, getBlogById}=require('../controllers/blog.controller')
const {createComment} = require('../controllers/comment.controller')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
  })

  const upload = multer({ storage: storage })


router.get('/add-New', (req, res) => {
    return res.render('addBlog',{
        user:req.user
    })
})


router.get('/:id', getBlogById)


router.post('/',upload.single('coverImage'),createNewBlog)


router.post('/comment/:blogId',createComment)
module.exports = router