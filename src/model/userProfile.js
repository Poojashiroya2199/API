const mongoose=require("mongoose");
const userProfileSchema=new mongoose.Schema({
    gender:{
        type:Number,
    },
    dob:{
        type:String,
    },
    address:{
        type:String
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department'
    },
    role:{
        type:String,
        // required:true
    },
    joining:{
        type:String,
    },
    image:{
        type:String
    }

});

const UserProfile=mongoose.model("UserProfile",userProfileSchema);
module.exports=UserProfile;