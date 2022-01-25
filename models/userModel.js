const mongoose=require("mongoose");
const validator=require("validator");


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        validate:[validator.isEmail,"Please enter valid email"],
        lowercase:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["user","admin","guide"],
        default:"user"
    },
    passwordChangedAt:Date
})

userSchema.methods.passwordNotChangedAfter=function(tokenIssuedTime){
    if(this.passwordChangedAt){
        return tokenIssuedTime>Number(this.passwordChangedAt.getTime()/1000);
    }
    return true;
}
userSchema.pre("save",async function(next){
    if(!this.isModified("password") ||this.isNew)
        return next();
    this.passwordChangedAt=Date.now()-1000;
    next();
});

const User=mongoose.model("User",userSchema);
module.exports=User;