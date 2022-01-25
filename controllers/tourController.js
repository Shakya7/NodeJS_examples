const Tour=require("../models/tripModel");

exports.getAllTours=async (req,res)=>{
    try{
        console.log("Getting all Tours Middleware");
        const tours=await Tour.find();
        res.status(200).json({
            status:"success",
            data:{
                status:"success",
                result:tours.length,
                tours
            }
        })
    }catch(err){
        res.status(400).json({
            status:"fail",
            messsage:err
        })
    }
}
exports.createTour=async (req,res)=>{
    try{
    const tour=await Tour.create(req.body);
    res.status(201).json({
        data:{
            tour
        }
    });
    }catch(err){
        res.status(400).json({
            status:"fail",
            messsage:err
        })
    }
}

exports.updateTour=async (req,res)=>{
    try{
    const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(201).json({
        status:"success",
        data:{
            tour
        }
    })
    }catch(err){
        res.status(400).json({
            status:"fail",
            messsage:err
        })
    }

}
