const {Router} =require("express");
const {body,validationResult}=require("express-validator");
const {UserProfileUpdationError}=require("./../util/errors");
const UserProfile=require("./../model/userProfile");

module.exports=()=>{
    const userProfileMiddleware=Router();
    userProfileMiddleware.get("/:id",async(req,res,next)=>{
        const id=req.params.id;
       await UserProfile.find({_id:id})
       .then(data=>{
               res.send(data);
               next();
       })
       .catch(err=>{
           console.log(err);
           throw new UserProfileUpdationError("Error in userprofile");
       })
    })
    
    userProfileMiddleware.put("/:id",
    body("gender").notEmpty().isNumeric().isLength({min:1,max:1}),
    body("dob").notEmpty().isLength(10),
    body("address").notEmpty().isAlphanumeric().isLength({min:5,max:100}),
    body("role").notEmpty().isObject(),
    body("joining").notEmpty().isLength(10),
    (req,res,next)=>{
        const errors=validationResult(req.body);
        if(!errors.isEmpty()){
            // console.log("user profile updated data in valid");
            throw new UserProfileUpdationError("please provide valid data");
            // res.send("Invalid userProfile data");
        }
        else{
            console.log("valid user Profile");
        next();
        }
    })

//    userProfileMiddleware.put("/:id",async(req,res,next)=>{
//        console.log(req.params.id);
//      await UserProfile.find({_id:req.params.id})
//        .then(data=>{
//         if(!data){
//            next(UserProfileUpdationError("Error in updation"));
//         }
//         // console.log(data);
//        else{
//         req.userProfile=data.tojson();
//         console.log(req.userProfile);
//         next()
//        }
//     })
//     .catch(err=>{
//         // console.log("In middleware",err);
//         next(err)
//     })
//    })
    return userProfileMiddleware;
}