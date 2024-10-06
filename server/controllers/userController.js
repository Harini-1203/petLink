const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt");
const userModel=require("../models/user")
const jwt=require("jsonwebtoken");

const getAllUsers= asyncHandler(async (req,res)=>{
    const allUsers=await userModel.find().select('-password').lean();
    if(!allUsers){
        return res.status(400).json({message:"not enough users"})
    }
    res.json(allUsers)
})

const createNewUser= asyncHandler(async (req,res)=>{
    const {username,email,password,profilePic}=req.body
    if(!username ||!email || !password){
        res.status(400).json({"message":"all"})
    }

    //to check for duplicates
    const duplicates=await userModel.findOne({username}).lean()
    if(duplicates){
        res.status(400).json({"message":"user already exist"});
    }

    //hasing password
    const encrypted=await bcrypt.hash(password,10)

    const userObject={username,email,"password":encrypted,profilePic};
    const user=await userModel.create(userObject);
    if(user){
        return res.status(200).json({message:"new user created"}); 
    }
    else{
        res.status(400).json({"message":"user data is not valid"});  
    }
    

})


const loginUser=asyncHandler( async (req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        res.status(400);
        throw new Error("all fields are required");
    }
    const user=await userModel.findOne({username});
    //compare passwords
    if(user &&  await bcrypt.compare(password,user.password)){
        //provide accestoken
        const accestoken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user._id
            }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"7d"}
        );
        res.status(200).json({username,accestoken})
    }
    else{
        res.status(400).json({"message":"invalid username or password"});  
    }
}
)


const updateUser=asyncHandler( async (req,res)=>{
    const {oldUsername,newUsername,oldPass,newPass}=req.body;
    const user=await userModel.findOne({username:oldUsername})
    console.log(user);
    console.log(req.body);
    if(user && newUsername){
        user.username=newUsername;
    }
    if(user && await bcrypt.compare(oldPass,user.password)){
        user.password=await bcrypt.hash(newPass,10);
    }
    else{
        res.status(401).json({message:"incorrect password"});
    }
    await user.save();
    res.status(200).json({message:"updated succesfully"})
}
)

const getCurrent = asyncHandler(async (req, res) => {
    // Return the decoded user info in the response
    res.status(200).json({
        message: "User info",
        user: req.user
    });
});

module.exports={
    getAllUsers,
    createNewUser,
    getCurrent,
    loginUser,
    updateUser
}