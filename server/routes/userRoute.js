const mongoose=require("mongoose");
const express=require("express")
const userRouter=express.Router();
const UserCon=require('../controllers/userController')
const validateToken=require('../middleware/validateToken');


userRouter.route('/')
    .get(UserCon.getAllUsers)
userRouter.route('/update').put(UserCon.updateUser);
userRouter.route('/register').post(UserCon.createNewUser);
userRouter.route("/login").post(UserCon.loginUser);
userRouter.route("/current").get(validateToken,UserCon.getCurrent);
module.exports=userRouter;