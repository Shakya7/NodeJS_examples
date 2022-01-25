const reviewController=require("../controllers/reviewController");
const express=require("express");
const userController=require("../controllers/userController");

const router=express.Router({mergeParams:true});

router.route("/").get(reviewController.getAllReviews).post(userController.protect,reviewController.createReview);
router.route("/:id").get(reviewController.getReview).patch(reviewController.updateReview);

module.exports=router;
