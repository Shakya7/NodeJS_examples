const User=require("../models/userModel");
const jwt=require("jsonwebtoken");


exports.signup=async (req,res,next)=>{
    try{
    const newUser=await User.create(req.body);
    const token=jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES});
    res.status(201).json({
        status:"success",
        newUser,
        token
    });
    }catch(err){
        res.status(400).json({
            status:"fail12",
            messsage:err
        })
    }
}

exports.login=async (req,res,next)=>{
    try{
    const {email,password}=req.body;
    console.log(password);
    const user=await User.findOne({email:email});
    console.log(user.password);
    //console.log(user);
    console.log(!password===user.password);
    if(!user || password!==user.password)
        return next("Please enter valid email address or password");
    const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES});
    res.status(201).json({
        status:"success",
        user,
        token
    });   
    }catch(err){
        res.status(400).json({
            status:"fail5",
            messsage:err
        })
    }
}
exports.getAllUsers=async (req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json({
            status:"success",
            data:{
                status:"success",
                result:users.length,
                users
            }
        })
    }catch(err){
        res.status(400).json({
            status:"fail",
            messsage:err
        })
    }
}

exports.protect=async (req,res,next)=>{
    try{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        token=req.headers.authorization.split(" ")[1];
    } 
    if(!token)
        return next("User is not logged in");
    const decoded=jwt.verify(token,process.env.SECRET_KEY);
    const user=await User.findOne({_id:decoded.id});
    if(!user)
        return next("User is not there in DB");
    if(!user.passwordNotChangedAfter(decoded.iat))      
        return next("Password is changed after token is issued, please login again");
    req.user=user;
    next(); 
    }catch(err){
        res.status(400).json({
            status:"fail",
            messsage:err
        })
    }
}

exports.getTourGuides=async (req,res)=>{
    try{
    const user=await User.find({role:{$eq:"guide"}});
    res.status(200).json({
        status:"success",
        results:user.length,
        data:{
            user
        }
    })
    }catch(err){
        res.status(400).json({
            status:"fail",
            messsage:err
        })
    }
}