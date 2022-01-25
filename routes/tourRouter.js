const express=require("express");
const tourController=require("../controller/tourController");

const router=express.Router();

router.route("/").get(tourController.getTours).post(tourController.createTour);
router.route("/distance-from/:latlong/:unit").get(tourController.getDistance);
router.route("/near/:latlong/maxDist/:dist/unit/:unit").get(tourController.nearTours);
router.route("/:latlong/:unit").get(tourController.getToursDistance);

module.exports=router;