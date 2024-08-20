const asyncHandler=require('express-async-handler');
const reviewModel=require('../models/review');

const getAllReviews=asyncHandler(async (req,res)=>{
    const all=await reviewModel.find().lean();
    if(!all){
        return res.status(400).json({message:"no reviews"})
    }
    res.status(200).json(all);
})

const addReview=asyncHandler(
    async (req,res)=>{
        const newr=await reviewModel.create(req.body);
        if(!newr){
            return res.status(409).json({message:"error while adding"})
        }
        res.status(200).json({message:"added succesfully"});
    }
    
)
module.exports={
    getAllReviews,
    addReview
}