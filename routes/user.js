const express = require('express');
const router = express.Router();
const {handleUserSignup,handleUserSignin} = require('../controllers/user.controller')


router.get('/signin',(req,res)=>{
    res.render('signin')
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.redirect('/')
})

router.post('/signup',handleUserSignup)
router.post('/signin',handleUserSignin)
module.exports = router