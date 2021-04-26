const {Router}=require("express");
const {UserProfileUpdationError}=require("./../util/errors");
const {updateuserProfile,userProfileById,deleteuserprofile} =require("./../services/userServices/userProfile");
const UserProfile =require("./../model/userProfile");

module.exports=()=>{
    const userProfileapi=Router();
    userProfileapi.get("/",async(req,res)=>{
       await UserProfile.find()
       .then(data=>{
            console.log(data);
            res.status(200).send(data);
        })
        .catch(err=>{
            console.log(err);
            throw new UserProfileUpdationError("not able to get  users profiles");
        })
    })
   
    userProfileapi.get("/:id",async(req,res)=>{
    console.log(req.params.id);
    const id=req.params.id;
    await userProfileById(id)
    .then(data=>console.log(data))
    .catch(err=>{
        console.log(err);
    throw new UserProfileUpdationError("unable to fetch");
    });
    })

    userProfileapi.put("/:id",async(req,res)=>{
        // console.log(req.params.id);
        // console.log(req.body);
      await updateuserProfile(req.body,req.params.id)
       .then(data=>{
           console.log(data);
           res.send(data);
       })
       .catch(err=>console.log(err))     
    });

    userProfileapi.delete("/:id",async(req,res)=>{
        const id=req.params.id;
        await deleteuserprofile(id)
        .then(data=>{
            console.log(data);
            res.send(data);
        })
        .catch(err=>console.log(err));
    })
    return userProfileapi;
}
