const mongoose  = require("mongoose");

const tourSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true, "A tour must have a name"],
        unique:true,
        trim:true
    },
    price: Number,
    duration:{
        type:Number,
        validate:{
            validator:function(val){
                return val<10;
            },
            message:"This is wrong"
        }
    },
    maxGroupSize: Number,
    difficulty: {
        type:String,
        enum:{
            values:["easy","medium","difficult"],
            message:"Must be among three"
        }
    },
    ratingsAverage: Number,
    ratingsQuantity: Number,
    summary: String,
    description: String,
    imageCover: String,
    images: [String],
    startDates: [String],
    startLocation:{
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String
    }
});

tourSchema.index({startLocation:"2dsphere"});

tourSchema.post(/^findOneAnd/,async function(doc){
    console.log(doc);
});

const Trip=mongoose.model("Trip",tourSchema);

module.exports=Trip;