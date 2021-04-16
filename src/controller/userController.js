const {Router}=require("express");
const User=require("./../model/user");
const {UserCreationError, InternalServerError}=require("./../util/errors");
const {authenticate}=require("./../services/authServices/auth");
const {encryptPassword,createUser,userById}=require("./../services/userServices/user");
const createProfile =require("./../services/userServices/userProfile");

module.exports=()=>{
    const userApi=Router();
    userApi.get("/",(req,res)=>{
    //   console.log("I am handling get user request"+req.user);
      User.find()
      .then(data=>{
          console.log(data);
          res.status(200).send({data})
      })
      .catch(err=>{
          console.log(err);
          throw new UserCreationError("Unable to fetch data");
      })
    });

    userApi.get("/:id",(req,res,next)=>{
        console.log(req.params.id);
        userById(req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(err=>{
            console.log(err);
        next(new InternalServerError("unable to fetch"));
        });
    });

    userApi.post("/",async (req,res,next)=>{
        const userProfile=req.body;
        // console.log(userProfile);
        const userProfileId= await createProfile(userProfile);
        // console.log(userProfileId);
        const user= {...req.body,userProfile:userProfileId}
        // console.log(user);
        encryptPassword(req.body.password)
        .then(hashedPassword=>{
           // console.log(hashedPassword);
            createUser({
                ...user,
                password:hashedPassword
            }).then(data=>{
                console.log(data);
                res.status(201).json({
                uuid:data,
                message:"User created Successfully"
               })
             }).catch(err=>{
                console.log("find error"); 
                console.log(err)
                res.send("Please fill up data correctly");
             });
        })
        .catch(err=>{
            console.log(err);
            next(err);
        })
    //    console.log(req.body);
        console.log("i am handling post user request")
        // res.json({
        //     message:"Post USER"+req.params.id
        // })
    })

    userApi.put("/:id",(req,res)=>{
        console.log("i am handling put user request")
        res.json({
            message:"PUT USER"+req.params.id
        })
    })
    userApi.delete("/:id",(req,res)=>{
        console.log("I am handling DELETE user Request");
        res.json({
            message:"DELETE USER"+req.params.id
        })
    })
    return userApi;
}