const express=require('express')
const reviewRouter=express.Router();
const reviewController=require('../controllers/reviewController')

reviewRouter.route('/')
    .get(reviewController.getAllReviews)
    .post(reviewController.addReview)

module.exports=reviewRouter;