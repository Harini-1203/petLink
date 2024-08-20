const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt");

const express=require('express')

const userModel=require("../models/user")

const mongoose=require('mongoose');

const getAllUsers= asyncHandler(async (req,res)=>{
    const allUsers=await userModel.find().select('-password').lean();
    if(!allUsers){
        return res.status(400).json({message:"not enough users"})
    }
    res.json(allUsers)
})

const createNewUser= asyncHandler(async (req,res)=>{
    
    const {username,email,password,profilePic}=req.body
    
    //to check for duplicates
    const duplicates=await userModel.findOne({username}).lean()
    if(duplicates){
        return res.status(409).json({message:"username already exists"});
    }

    //hasing password
    const encrypted=await bcrypt.hash(password,10)

    const userObject={username,email,"password":encrypted,profilePic};
    const user=await userModel.create(userObject);
    console.log('Request Body:', user);
    if(user){
        return res.status(200).json({message:"new user created"});
        
    }
    else{
        return res.status(400).json({message:"not crt data"})
    }
    

})

module.exports={
    getAllUsers,
    createNewUser
}