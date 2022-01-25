const Tour=require("../models/tripModel");

exports.getAllTours= async(req,res)=>{
    try{
    //console.log(req.query);
    let qString=JSON.stringify(req.query);

    qString=qString.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
    //console.log(JSON.parse(qString));
    //console.log(qString);


    //console.log(JSON.parse(req.query));
    const tours=await Tour.find()//.limit(1);
    //console.log(tours);
    //tours=tours.sort(query1)
    //console.log(query1);
    //if(req.query.sort)
        //query1=query1.sort(req.query.sort)
    //const sortedTrips= await Tour.find(JSON.parse(query1));  
    res.status(200).json({
        status: "success",
        result: tours.length,
       // sorted:{data:sortedTrips},
        data:{
            tours
        }
    });
    }catch(err){
        res.status(400).json({
            status:"fail",
            message: err
        })
    }
}
exports.getTour=async(req,res)=>{
    try{
    const tour=await Tour.findById(req.params.id);
    const queryObj=req.query;
    //console.log(queryObj);
    //console.log({...queryObj});
    if(!tour)
        throw "Tour not found";
    res.status(200).json({
        status:"success",
        data: {
            tour
        }
    });
    }catch(err){
        res.status(400).json({
            status:"fail",
            message: err
        })
    }
}
exports.createTour=async(req,res)=>{
    try{
    const tour=await Tour.create(req.body);
    res.status(200).json({
        status:"success",
        data: {
            tour
        }
    });
    }catch(err){
        res.status(400).json({
            status:"fail",
            message: err
        })
    }
}
exports.updateTour=async(req,res)=>{
    try{
    const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    if(!tour)
        throw "Tour not found";
    res.status(201).json({
        status:"success",
        data: {
            tour
        }
    });
    }catch(err){
        res.status(400).json({
            status:"fail",
            message: err
        })
    }
}
exports.deleteTour=async(req,res)=>{
    try{
    const tour=await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"success",
        data: {
            tour
        }
    });
    }catch(err){
        res.status(400).json({
            status:"fail",
            message: err
        })
    }
}

exports.getToursWithin=async(req,res)=>{
    try{
    const {distance, latlong, unit }=req.params;
    const [lat, long]= latlong.split(",");

    const radians=unit==="mi"? distance/ 3963.2 : distance/6378.1
    const tours=await Tour.find({
        startLocation:{ $geoWithin:{$centerSphere:[[long,lat],radians]}}
    });

    res.status(200).json({
        status:"success",
        data:{
            result:tours.length,
            tours
        }
    })
    }catch(err){
        res.status(400).json({
            status:"fail",
            message: err
        })
    }
}

exports.getToursDistance=async (req,res)=>{
    try{
    const {latlong,unit}=req.params;
    const [lat,long]=latlong.split(",");
    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
    const tours=await Tour.aggregate([
        {
            $geoNear:{
                near:{
                    type:"Point",
                    coordinates:[long*1, lat*1]
                },
                distanceMultiplier:multiplier,
                distanceField:"distance"
            }
        },
        {
            $project:{
                name:1,
                distance:1,
                _id:0
            }
        }
    ]);
    res.status(200).json({
        status:"success",
        data:{
            tours
        }
    })

    }catch(err){
        res.status(400).json({
            status:"fail",
            message: err
        })
    }
}