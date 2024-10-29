const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()

const userRoute = require('./routes/user')
const mongoose = require('mongoose')

const {User} = require("./models/user.model")

//connect to mongodb
mongoose.connect(process.env.MONGO_URL).then(() => console.log("MongoDB connected")).catch((err) => console.log("MongoDB connection failed", err))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))



//routes
app.use('/user', userRoute) 

app.get('/', (req, res) => res.render('home'))
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))












app.get('/test', async (req, res) => {
    const allUrsers = await User.deleteMany({})
    return res.json(allUrsers)
});
