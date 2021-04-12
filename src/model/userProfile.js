const mongoose=require("mongoose");
const Department=require("./../model/deparment");
const userProfileSchema=new mongoose.Schema({
    gender:{
        type:Number,
    },
    dob:{
        type:String
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
        required:true
    },
    joining:{
        type:Date,
        required:true
    }
});

const UserProfile=mongoose.model("UserProfile",userProfileSchema);
module.exports=UserProfile;