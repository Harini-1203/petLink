const mongoose=require('mongoose')
const asyncHandler=require('express-async-handler');
const petModel=require('../models/pet');

const getAllPets=asyncHandler(async (req,res)=>{
    const allpets=await petModel.find().lean()
    if(!allpets){
        return res.status(400).json({message:"no pets for now"})
    }
    res.status(200).json(allpets)
})

const createNewPet=asyncHandler(async (req,res)=>{
    // const userid=req.user._id;
    const petBody={...req.body}
    const pets=await petModel.create(petBody)
    if(!pets){
        res.status(409).json({message:"unable to create"})
    }
    res.status(200).json({message:"created succesfully"})
})

module.exports={
    getAllPets,
    createNewPet
}