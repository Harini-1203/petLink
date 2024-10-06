const mongoose=require('mongoose')
const asyncHandler=require('express-async-handler');
const petModel=require('../models/pet');

// const cloudinary = require('../config/CloudinaryConfig');


const getAllPets=asyncHandler(async (req,res)=>{
    const allpets=await petModel.find().lean()
    if(!allpets){
        return res.status(400).json({message:"no pets for now"})
    }
    res.status(200).json(allpets)
})

// Assuming the pet schema is in models/petModel

// const createNewPet = asyncHandler(async (req, res) => {
//     try {
//         console.log("Received data:", req.body);
//         const {name, age, breed, type, status, price, description, location, ownerphn } = req.body;

//         // Check if the price is provided only when status is 'For Sale'
//         if (status === 'For Sale' && !price) {
//             return res.status(400).json({ message: 'Price is required when the pet is for sale.' });
//         }
//         // Create the pet object
//         console.log("user",req.user.user);
//         const petData = {
//             user_id: req.user.user.id,
//             name,
//             age,
//             breed,
//             type,
//             status,
//             price: status === 'For Sale' ? price : null,  // Price is only applicable for 'For Sale'
//             description,
//             location,
//             ownerphn,
//             images: [],  // Since image upload is not being used, this is kept empty
//         };


//         // Create the pet in the database
//         const pet = await petModel.create(petData);

//         if (!pet) {
//             return res.status(409).json({ message: 'Unable to create pet' });
//         }
//         console.log(req.user);
//         // Success response
//         res.status(201).json({ message: 'Pet created successfully', pet });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

const deletePet=asyncHandler(async (req,res)=>{
    const petid=req.params.id;
    const deletedPet=await petModel.findByIdAndDelete(petid);
    if(!deletedPet){
        return res.status(404).json({message:"pet not found"})
    }
    res.status(200).json({message:"successfully deleted"})
})

const getSinglePet=asyncHandler(async (req,res)=>{
    const petid=req.params.id;
    const singlePet=await petModel.findById(petid);
    if(!singlePet){
        return res.status(404).json({message:"pet not found"})
    }
    res.status(200).json(singlePet)
})

const getByUser=asyncHandler( async(req,res)=>{
    const userid=req.params.id;
    const petsByUser=await petModel.find({user_id:userid});
    if(!petsByUser){
        return res.status(200).json({message:"no pets uploaded"});
    }
    res.status(200).json(petsByUser);
}

)

module.exports={
    getAllPets,
    deletePet,
    getSinglePet,
    getByUser
    
}