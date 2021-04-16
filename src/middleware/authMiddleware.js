const  {Router}=require("express");
const {body,validationResult}=require("express-validator");
const User =require("./../model/user");
const {AuthenticationError}=require("./../util/errors");

module.exports=()=>{
    const authMidddleware=Router();

    authMidddleware.post("/login",body("password").notEmpty().isLength({min:6}).isAlphanumeric(),
    (req,res,next)=>{
        console.log(req.body);
        const {username,password}=req.body;
        if(!username)throw new AuthenticationError({code:"ATH-01",message:"email/username cannot be empty"})
        const errors=validationResult(req.body);
        if(!errors.isEmpty()){
            console.log("User data is invalid");
            throw new AuthenticationError({code:"ATH-01",message:errors.errors})
        }
        User.findOne({userName:username})
        .then(data=>{
            if(!data) {
                res.send("User doesn't exists, please sign up");
                throw new AuthenticationError({code:"ATH-02",message:"User doesnt exists, Please sign up"})
            }
            req.user=data;
            next();
        })
        .catch(err=>{
            console.log(err);
            next(err);
        })
    })
    return authMidddleware;
};