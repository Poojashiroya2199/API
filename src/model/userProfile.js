const mongoose=require("mongoose");
const userProfileSchema=new mongoose.Schema({
    gender:{
        type:Number,
    },
    dob:{
        type:Date
    },
    address:{
        type:Object
    },
    department:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Department'
    },
    role:{
        type:Object,
        // required:true
    },
    joining:{
        type:Date,
        // required:true
    },
    image:{
        type:String
    }

});

const UserProfile=mongoose.model("UserProfile",userProfileSchema);
module.exports=UserProfile;