const Review=require("../models/reviewModel");

exports.createReview=async (req,res)=>{
    try{
    const userID=req.user._id;
    const review=await Review.create({
        review:req.body.review,
        rating:req.body.rating,
        userID,
        tourID:req.params.tripID
    });
    res.status(201).json({
        status:"success",
        data:{
            review
        }
    })
    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err
        })
    }
}
exports.getAllReviews=async (req,res)=>{
    try{
        let filter={};
        if(req.params.tripID)
            filter={tourID:req.params.tripID}
        //console.log(req.query);    
        if(req.query.rating)
            filter={rating: req.query.rating}    
            
        const reviews=await Review.find(filter);
        res.status(200).json({
            status:"success",
            data:{
                status:"success",
                result:reviews.length,
                reviews
            }
        })
    }catch(err){
        res.status(400).json({
            status:"fail",
            messsage:err
        })
    }
}

exports.getReview=async (req,res)=>{
    try{
        const review=await Review.findById(req.params.id);
        //console.log(review);
        res.status(200).json({
            status:"success",
            data:{
                review
            }
        })
    }catch(err){
        res.status(400).json({
            status:"failh",
            messsage:err
        })
    }   
}

exports.updateReview=async function(req,res){
    try{
    const review=await Review.findById(req.params.id);
    if(req.body.rating)
        review.rating=req.body.rating;
    if(req.body.review)    
        review.review=req.body.review;
    await review.save();
    res.status(200).json({
        status:"success",
        data:{
            review
        }
    })
    }catch(err){
        res.status(400).json({
            status:"fail",
            messsage:err
        })
    }

    
}