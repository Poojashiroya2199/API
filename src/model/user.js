const mongoose=require("mongoose");
const constants=require("./../util/constants");
const UserProfile=require("./../model/userProfile");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        unique:true,
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true,
            // validate:{
            //     validator:(value) => /\d{10}/.test(value)
            // },
            // message: props => `${props.value} is not a valid phone number`
    },
    email:{
        unique:true,
        type:String,
        required:true
    },
    password:{
        type:String
    },
    userType:{
        type:Number,
        required:true,
        // validate:{
        //     validator:(values) =>  Object.values(constants.userType).includes(values)
        // },
        // message: props => `${props.value}  invalid user type`
    },
    userProfile:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'UserProfile'
    },
    roleofuser:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Role'
    },
    department:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Department"
    },
    auth:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Auth'
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    updatedAt:{
        type:Date,
        default: Date.now()
    }
});
const User = mongoose.model('User',userSchema)

module.exports= User;
