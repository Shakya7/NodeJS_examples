const express=require("express");
const userController=require("../controllers/userController");


const router=express.Router();
router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route("/tourGuides").get(userController.protect,userController.getTourGuides);
router.route("/").get(userController.protect,userController.getAllUsers);

module.exports=router;