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
        throw new UserCreationError("User creation failed");
    })
}

module.exports={
    encryptPassword,
    userById,
    createUser
}