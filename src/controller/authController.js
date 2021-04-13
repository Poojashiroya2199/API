const {Router}=require("express");
const { AuthenticationError, AuthorizationError } = require("../util/errors");
const {comparePassword,generateAccessToken,authenticate, logoutUser}=require("./../services/authServices/auth");

module.exports=()=>{
    const authApi=Router();
    authApi.post("/login",(req,res)=>{
        console.log("User Context",req.user);
        comparePassword(req.body.password,req.user.password)
        .then(isEqual=>{
            if(!isEqual)throw new AuthenticationError({code:"ATH-03",message:"password is incorrect"});
            generateAccessToken(req.user)
            .then(accessToken=>{
                res.setHeader("Authorization",`Bearer ${accessToken}`)
                res.status(200).json({
                    id:req.user._id
                })
                
            })
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    })
  

    authApi.get("/logout",(req,res,next)=>{
      // console.log("User context",req.user);
      // console.log(req.accessToken);
       logoutUser(req.accessToken)
       .then(data=>{
           res.status(200).json({
               message:"User successfully loggedout"
           })
       })
       .catch(err=>{
           console.log(err);
           next(new AuthorizationError({code:"ATR-05",message:"Unsuccessful request"}))
       })
    })
    return authApi;
}