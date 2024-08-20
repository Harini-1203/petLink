const express=require("express");
const petRouter=express.Router();
const petController=require("../controllers/petController")

petRouter.route('/')
    .get(petController.getAllPets)
    .post(petController.createNewPet)

module.exports=petRouter;

