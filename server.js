const express=require("express");
const app=require("./app");
const mongoose=require("mongoose");

mongoose.connect(process.env.DB_C).then(connection=>console.log("Connected to DB"));



app.listen(6000,()=>console.log("Listening to requests..."));