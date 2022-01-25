const mongoose=require("mongoose");
const Trip=require("./tripModel");

const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true,"A review must have some reviews"]
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:Date,
    tourID:{
        type:mongoose.Schema.ObjectId,
        ref:"Tour"
    },
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
});

/*reviewSchema.pre(/^find/,async function(next){
    this.r="DFFFFF"
    console.log(this.r);
    //console.log(this);
    this.populate({
        path:"userID"
    });
    next();
});*/
reviewSchema.pre(/^findById/,function(next){
    //const r=await this.findOne();
    //console.log(r);
    //next();
    console.log("Hwllo")
})
reviewSchema.post(/^find/,async function(){
    console.log("Post query schema Midd");
    //console.log(this.r);
})

reviewSchema.statics.aggregateAndSaveData=async function(tripID){
    const stats= await this.aggregate([
        {
            $match:{
                tourID:tripID
            }
        },
        {
            $group:{
                _id:"tourID",
                nRatings:{$sum:1},
                avgRating:{$avg:"$rating"}
            }
        }
    ]);
    await Trip.findByIdAndUpdate(tripID,{
        noOfReviews:stats[0].nRatings,
        ratingsAvg:stats[0].avgRating.toFixed(2)
    });
};

reviewSchema.post("save",async function(){
    this.constructor.aggregateAndSaveData(this.tourID);
})

const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;