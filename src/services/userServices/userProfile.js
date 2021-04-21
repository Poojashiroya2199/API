const UserProfile =require("./../../model/userProfile");
const { userById } = require("./user");
// const User =require("./../../model/user");
const createProfile=(data)=>{
    console.log(data);
    const userProfile=new UserProfile(data);
    return userProfile.save().then(data=>data._id).catch(err=>console.log(err));
}
const updateuserProfile=async(newuser,id)=>{
    console.log(newuser,id);
    await UserProfile.findByIdAndUpdate({_id:id},newuser,{upsert:true,new:true})
        .then(data=>{
            console.log(data);
            return data;
        })
        .catch(err=>{
            console.log("In service",err)
        });
}
const userProfileById=async(id)=>{
    await UserProfile.findById({_id:id})
    .then(data=>{
        console.log(data);
        return data;
    })
    .catch(err=>{
        console.log("In service",err);
    })
}
module.exports ={
    createProfile,
    updateuserProfile,
    userProfileById
}