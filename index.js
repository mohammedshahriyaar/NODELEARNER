const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')


const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

const {User} = require("./models/user.model")
const{Blog} = require("./models/blog.model")

const { checkforAuthCookie } = require('./middlewares/auth.middleware')

const {getAllBlogs} = require("./controllers/blog.controller")  
const { stat } = require('fs')
//connect to mongodb
mongoose.connect(process.env.MONGO_URL).then(() => console.log("MongoDB connected")).catch((err) => console.log("MongoDB connection failed", err))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(checkforAuthCookie("token"))
app.use(express.static(path.resolve(path.resolve('./public'))))



//routes
app.use('/user', userRoute)
app.use('/blog',blogRoute)
app.get('/',async (req,res)=>{

    const allBlogs =await getAllBlogs()
    res.render('home',{
        user:req.user,
        blogs:allBlogs})
})
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))












app.get('/test', async (req, res) => {
    const allUrsers = await User.deleteMany({})
    return res.json(allUrsers)
});
