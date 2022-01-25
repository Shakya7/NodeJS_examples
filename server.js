const app= require("./app");
const mongoose=require("mongoose");

const dbConnectNow=async function(){
    await mongoose.connect(process.env.MONGO_ATLAS_CONNECTION);
    console.log("Connection to DB is successful");
}


app.listen(process.env.PORT,()=>{
    console.log("Listening to requests");
    dbConnectNow();
    
})