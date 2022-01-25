const tourController=require("../controllers/tourController");
const express=require("express");
const reviewRouter=require("./reviewRoutes");

const router=express.Router();
router.route("/").get(tourController.getAllTours).post(tourController.createTour);
router.route("/:id").patch(tourController.updateTour);

router.use("/:tripID/reviews",reviewRouter);

module.exports=router;