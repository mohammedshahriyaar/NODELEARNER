const e = require("express");
const {User} = require("../models/user.model")
async function handleUserSignup(req,res) {
    // console.log(req.body);
    const {fullName,email,password} = req.body;

    const user = await User.create({fullName,email,password});
    
    if(!user){
        return res.status(500).json({msg:"Error in creating user"})
    }

    return res.redirect('home')


}

async function handleUserSignin(req,res) {

    const {email,password} = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password)
        console.log('Token is',token)
        
        return res.cookie('token',token).redirect('/')
    } catch (error) {
        return res.render('signin',{
            error:"Invalid email or password"
        })
    }
    
}
module.exports = {handleUserSignup,handleUserSignin}