const {Router}=require("express");
const {body,validationResult} =require("express-validator");
const {UserCreationError,UserValidationError} =require("./../util/errors");
const User =require("./../model/user");
module.exports=()=>{
    const userMiddleware=Router();

    userMiddleware.post("/",
     body("email").isEmail(),
    body("password").notEmpty().isLength({min:6}).isAlphanumeric(),
    body("firstName").notEmpty().isLength({min:3,max:25}),
    body("lastName").notEmpty().isLength({min:3,max:25}),
    body("userName").notEmpty().isLength({min:3,max:25}),
    (req,res,next)=>{
        //validate post data
    //    console.log(req.body);
        const erros=validationResult(req.body);
        if(!erros.isEmpty()){
            console.log("user data is invalid");
            // res.send("user data is invalid");
            throw new UserValidationError(erros.errors)
        }
        console.log("validate data");
        next();
    })
    //get user data
    userMiddleware.post("/",(req,res,next)=>{
        User.findOne({userName:req.body.userName,email:req.body.email})
        .then(data=>{
            console.log(data+"hi");
            if(!data)next()
            else {
                res.send("User already exist, please sign in")
                throw new UserCreationError("User already exist, please sign in");
            }
        })
        .catch(err=>{
            console.log(err);
            next(err);
        });
        // res.send("successful");
    })
    return userMiddleware;
}