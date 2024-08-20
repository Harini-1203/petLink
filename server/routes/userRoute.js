const mongoose=require("mongoose");
const express=require("express")
const userRouter=express.Router();
const UserCon=require('../controllers/userController')



userRouter.route('/')
    .get(UserCon.getAllUsers)
    .post(UserCon.createNewUser)
module.exports=userRouter;