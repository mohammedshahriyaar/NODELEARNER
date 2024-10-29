const e = require("express");
const {User} = require("../models/user.model")
async function handleUserSignup(req,res) {
    console.log(req.body);
    const {fullName,email,password} = req.body;

    const user = await User.create({fullName,email,password});
    
    if(!user){
        return res.status(500).json({msg:"Error in creating user"})
    }

    return res.redirect('home')


}

async function handleUserSignin(req,res) {

    const {email,password} = req.body;

    
    const user = User.matchPassword(email,password)
    console.log('User',user)
    
    return res.redirect('/')
    
}
module.exports = {handleUserSignup,handleUserSignin}