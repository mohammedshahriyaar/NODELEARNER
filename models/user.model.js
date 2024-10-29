const {Schema,mongoose } = require("mongoose")

const {createHmac,randomBytes} = require("crypto")
const userSchema = Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        // default:"/images/default.png"
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{timestamps:true})


//presave mongoose
userSchema.pre("save",function(next){
    
    const user = this
    if(!user.isModified("password")) return 

    const salt = randomBytes(16).toString();
    // const salt = Buffer.from(process.env.SALT, 'utf8');


    const hashedPassword = createHmac("sha256",salt)
        .update(user.password)
        .digest("hex")
    
    this.salt = salt
    this.password = hashedPassword
    next()
})

//mongoose virtual funcs

userSchema.static('matchPassword',async function(email,password){
    const user = await this.findOne({email})
    if(!user) throw new Error("User not found")
    console.log(user)
    const salt = user.salt;
    // console.log(salt)
    const hashedPasswordfromdb = user.password

    const hashProvidedByUser = createHmac("sha256",salt)
        .update(password)
        .digest("hex")
    
    if(hashedPasswordfromdb !== hashProvidedByUser){
        throw new Error("Invalid Password")
    }
    return user
    
})
const User = mongoose.model("user",userSchema)
module.exports = {User}