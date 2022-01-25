const mongoose=require("mongoose");

const tourSchema=new mongoose.Schema({
    name:{
        type:"String",
        required:[true, "It should have a name"]
    },
    location:{
        type:{
            type:String,
            default:"Point",
            enum:["Point"]
        },
        coordinates:[Number],
        address:String,
    },
    price:Number
});
tourSchema.index({location:"2dsphere"});

const Tour=mongoose.model("Tour",tourSchema);
module.exports=Tour;