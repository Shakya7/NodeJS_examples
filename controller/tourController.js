const Tour=require("../model/tourModel");

exports.createTour=async (req,res,next)=>{
    try{
    const tour=await Tour.create(req.body);
    //if(!tour)
        //return next("No tour created");
    res.status(201).json({
        status:"success",
        data:{
            tour
        }
    })

    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err
        })
    }
}
exports.createTour=async (req,res,next)=>{
    try{
    const tour=await Tour.create(req.body);
    //if(!tour)
        //return next("No tour created");
    res.status(201).json({
        status:"success",
        data:{
            tour
        }
    })

    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err
        })
    }
}
exports.getTours=async (req,res,next)=>{
    try{
    const tours=await Tour.find();
    //if(!tour)
        //return next("No tour created");
    res.status(200).json({
        status:"success",
        result:tours.length,
        data:{
            tours
        }
    })

    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err
        })
    }
}

exports.getToursWithin=async (req,res,next)=>{
    try{
        const {latlong,dist,unit}=req.params;
        const [lat, long]=latlong.split(",");

        const maxUnit=unit==="mi"?dist/3963.2:dist/6378.1;
        console.log(maxUnit,lat,long);
        const tours=await Tour.find({
            location: { $geoWithin:{$centerSphere:[[long,lat],maxUnit]}}
        });
        console.log(tours);
        req.tours=tours;
        req.lat=lat;
        req.long=long;
        next();
        //if(!tour)
            //return next("No tour created");
        /*res.status(200).json({
            status:"success...hmm",
            result:tours.length,
            data:{
                tours
            }
        })*/
    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err
        })
    }
}

exports.getDistance=async(req,res)=>{
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

exports.nearTours=async (req,res,next)=>{
    try{
        const {latlong,dist,unit}=req.params;
        const [lat, long]=latlong.split(",");

        const maxUnit=unit==="mi"?dist/3963.2:dist/6378.1;
        console.log(maxUnit,lat,long);
        const tours=await Tour.find({

            //POLYGON -GEOWITHIN
            /*location: {$geoWithin: { $geometry: { type: 'Polygon', coordinates: [ [ [ 88.33903721815928, 22.558610166887696 ], [ 88.36683929768925, 22.5433982272597 ], [ 88.34590192915432, 22.538644152235218 ], [ 88.33903721815928, 22.558610166887696 ] ] ] }}}*/

            /*location: {$geoWithin: 
                        { $polygon: [[ 88.33903721815928, 22.558610166887696 ],[ 88.36683929768925, 22.5433982272597 ],[ 88.34590192915432, 22.538644152235218 ],[ 88.33903721815928, 22.558610166887696 ]]
                        }
                    }*/

            //GEO-INTERSECT
                    location:{
                        $geoIntersects:{
                            $geometry:{
                                type:"Polygon",
                                coordinates:[[[88.33903721815928, 22.558610166887696],[88.36683929768925, 22.5433982272597],[88.34590192915432, 22.538644152235218],[88.33903721815928, 22.558610166887696]]]
                            }
                            
                        }
                    }
    
        });
        console.log(tours);
        //if(!tour)
            //return next("No tour created");
        res.status(200).json({
            status:"success...hmm",
            result:tours.length,
            data:{
                tours
            }
        })
    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err
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
                distanceField:"distance",
                spherical:true
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
        result:tours.length,
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