const mongoose=require("mongoose");
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({

    username: {
        type:String,
        unique:[true,"username already Exits"],
        required:[true,"please add userName"]
    },
    email: {
        type:String,
        required:[true,"please add Email"]
    },
    password:{
        type:String,
        required:[true,"please enter password"]
    },
    profilePic:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});


// userSchema.methods.generateAuthToken=()=>{
//     const token=jwt.sign({_id:this._id},prcess.env.ACCESS_TOKEN_SECRET,{expiresIn:'7d'})
//     return token
// }

module.exports=mongoose.model('User',userSchema);
