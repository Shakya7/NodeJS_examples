const express=require("express");
const dotenv=require("dotenv");
const tourRouter=require("./routes/tourRouter")

dotenv.config({
    path:"./config.env"
})
const app=express();
app.use(express.json());

app.use("/api/v1/tours",tourRouter);


module.exports=app;