const mongoose=require("mongoose");
const User=require("./userModel");

const tripSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Trip must have a name"],
        unique:true
    },
    price:{
        type:Number,
        required:[true,"trip must have a price"]
    },
    guides:Array,
    referencedGuides:[{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }],
    ratingsAvg:{
        type:Number,
        default:2.5
    },
    noOfReviews:{
        type:Number,
        default:1
    }

});
tripSchema.pre("save",async function(next){
    const guidesPromises=this.guides.map(async el=>await User.findById(el));
    this.guides=await Promise.all(guidesPromises);
    next();
})
tripSchema.pre(/^find/,async function(next){
    this.populate({path:"referencedGuides"});
    next();
})

const Tour=mongoose.model("Tour",tripSchema);
module.exports=Tour;


