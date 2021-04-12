const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const config=require("./../../config");
const Auth =require("./../../model/auth");
const {InternalServerError,AuthorizationError}=require("./../../util/errors");

const comparePassword=(password,hashedPassword)=>bcrypt.compare(password,hashedPassword);

const generateAccessToken= (userContext)=>{
    console.log(userContext);
    const accessToken=jwt.sign({
        username:userContext.userName,
       email:userContext.email,
       uuid:userContext._id
    },config.SECRET,{
        expiresIn:config.TOKEN_TIME
    })
    const newAuth=new Auth({
        accessToken,
        expiresAt:new Date(new Date().getTime()+(config.TOKEN_TIME*1000)),
        user:userContext._id
    })

    return newAuth.save().then(data=>data.accessToken).catch(err=>{
        throw new InternalServerError("Access token generation failed");
    })
}

const authenticate=(req,res,next)=>{
    console.log(req);
   const auth=req.get("Authorization");
   console.log(auth);
   if(!auth) throw new AuthorizationError({
       code:"ATR-01",
       message:"Authorization not included"
   })
   const accessToken=auth.split(" ")[1];
   console.log(accessToken);
   let userContext;
   try{
       userContext=jwt.verify(accessToken,config.SECRET);
   }
   catch(err){
       console.log(err);
       next(new AuthorizationError({code:"ATR-02",message:"Invalid access token"}));
       return; 
   }
   Auth.findOne({accessToken})
   .then(data=>{
       if(!data)throw new AuthorizationError({code:"ATR-02",message:"Invalid access token, User not found"});
       if(data.logoutAt) throw new AuthorizationError({code:"ATR-03",message:"User has logged out,please login"});
       req.accessToken=accessToken;
       req.user=userContext;
       next(); 
   })
   .catch(err=>{
       console.log(err);
       next(err);
   })
}

const logoutUser=(accessToken)=>{
  return Auth.findOneAndUpdate({accessToken},{logoutAt:new Date()},{new:true})
}

module.exports={
    logoutUser,
    authenticate,
    comparePassword,
    generateAccessToken
}