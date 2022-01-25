const dotenv=require("dotenv");

const express=require("express");
const app=express();
const tourRoutes=require("./routes/tourRouter");
const userRoutes=require("./routes/userRouter");
const reviewRoutes=require("./routes/reviewRoutes");

dotenv.config({path:"./config.env"});

//1st Middleware
app.use(express.json());

//2nd Middlware
/*app.get("/",(req,res)=>{
    console.log("Went through 2nd Middleware of response with get('/')");
    res.status(200).json({
        status:"success"
    })
})*/


app.use("/api/v1/tours",tourRoutes);
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/reviews",reviewRoutes);



module.exports=app;