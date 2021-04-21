const bcrypt=require("bcrypt");
const config =require("./../../config");
const User=require("./../../model/user");
const {UserCreationError}=require("./../../util/errors");

const encryptPassword=(password)=>{
    return bcrypt.hash(password,config.salt_rounds);
}
const userById=(id)=>{
    console.log(id);
    return User.findOne({_id:id}).catch(err=>console.log(err));
}
const createUser=(data)=>{
    const user=new User(data);
    console.log(data);
    return user.save().then(user=>user._id).catch(err=>{
        console.log(err);
        // res.send("User creation failed");
        throw new UserCreationError("User creation failed");
    })
}


const updateUser=async(newuser,id)=>{
    return await User.findByIdAndUpdate({_id:id},newuser,{upsert:true,new:true})
        .then(data=>{
            // console.log(data);
            return data;
        })
        .catch(err=>{
            console.log("In service",err)
        });
};
module.exports={
    encryptPassword,
    userById,
    createUser,
    updateUser
}