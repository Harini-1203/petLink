const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username: {
        type:String,
        unique:true,
        require:true
    },
    email: {
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
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

module.exports=mongoose.model('User',userSchema);