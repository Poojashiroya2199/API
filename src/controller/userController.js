const {Router}=require("express");
const User=require("./../model/user");
const {UserCreationError, InternalServerError}=require("./../util/errors");
const {authenticate}=require("./../services/authServices/auth");
const {encryptPassword,createUser,userById, updateUser}=require("./../services/userServices/user");
const {createProfile} =require("./../services/userServices/userProfile");
const { createRoles } = require("../services/roleServices/roles");
const { createDepartment } = require("../services/deptServices/dept");

module.exports=()=>{
    const userApi=Router();
    userApi.get("/",(req,res)=>{
    //   console.log("I am handling get user request"+req.user);
      User.find()
      .then(data=>{
        //   console.log(data);
          res.status(200).send({data})
      })
      .catch(err=>{
          console.log(err);
          throw new UserCreationError("Unable to fetch data");
      })
    });

    userApi.get("/:id",(req,res,next)=>{
        // console.log(req.params.id);
        userById(req.params.id)
        .then(data=>res.status(200).json(data))
        .catch(err=>{
            console.log(err);
        next(new InternalServerError("unable to fetch"));
        });
    });
   
    userApi.post("/",async (req,res,next)=>{
        const userProfile=req.body;
        const userProfileId= await createProfile(userProfile);
        const userRoleId=await createRoles(userProfile);
        const userDepartId= await createDepartment(userProfile);
        const user= {...req.body,userProfile:userProfileId,roleofuser:userRoleId,userdept:userDepartId};
        encryptPassword(req.body.password)
        .then(hashedPassword=>{
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
        });
        console.log("i am handling post user request");
    })

   
    userApi.delete("/:id",(req,res)=>{
        console.log("I am handling DELETE user Request");
        res.json({
            message:"DELETE USER"+req.params.id
        })
    })
    return userApi;
}