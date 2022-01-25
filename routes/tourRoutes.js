const express=require("express");
const app=require("../server.js");
const tourController=require("../controllers/tourController");

const router=express.Router();

router.route("/").get(tourController.getAllTours).post(tourController.createTour)//.get(tourController.getTop5Tours);

router.route("/:id").get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);
router.route("/tour-within/:distance/center/:latlong/unit/:unit").get(tourController.getToursWithin);
router.route("/tour-distances-from/:latlong/unit/:unit").get(tourController.getToursDistance);

module.exports=router;