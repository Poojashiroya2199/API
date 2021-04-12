const UserProfile =require("./../../model/userProfile");

const createProfile=(data)=>{
    console.log(data);
    const userProfile=new UserProfile(data);
    return userProfile.save().then(data=>data._id).catch(err=>console.log(err));
}

module.exports =createProfile;