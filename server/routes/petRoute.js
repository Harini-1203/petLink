const express=require("express");
const petRouter=express.Router();
const petController=require("../controllers/petController");
const validateToken = require("../middleware/validateToken");

// petRouter.use(validateToken)

petRouter.route('/')
    .get(petController.getAllPets)
// petRouter.post('/',upload.array('images'),petController.createNewPet)
petRouter.delete('/:id',petController.deletePet);
petRouter.get('/:id',petController.getSinglePet)
petRouter.get('/user/:id',petController.getByUser);

// petRouter.post('/createPet',validateToken,petController.createNewPet);

module.exports=petRouter;

