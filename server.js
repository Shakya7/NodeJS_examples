const express=require("express");
const mongoose = require("mongoose");
const app=express();
const path=require("path");
const dotenv=require("dotenv");
const tourRouter=require("./routes/tourRoutes");

dotenv.config({path:"./config.env"});
app.use(express.json());


app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));

app.get("/", (req,res)=>{
    res.status(200).render("base");
})

const DB=process.env.DB_CONNECTION.replace("<password>",process.env.PASSWORD);
mongoose.connect(DB).then(connection=>console.log("DB connection successful"));


app.get("/overview",(req,res)=>{
    res.status(200).render("overview",{
        name: "overview",
        desc:"Hello"
    });
});
app.get("/tours", (req,res)=>{
    res.status(200).render("tours");
})

app.use("/api/v1/trips",tourRouter);



app.listen(5600,()=>{
    console.log("Listening to server");
})

module.exports=app;