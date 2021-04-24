const Role =require("./../../model/role");

const createRoles=(data)=>{
    const role=new Role(data);
    return role.save().then(data=>data._id).catch(err=>console.log(err));;
}

const updateRole=(newRole,oldRole)=>{
    const updateData={...oldRole,...newRole};
    console.log(updateData);
    return Role.findByIdAndUpdate(oldRole._id,updateData,{upsert:true,new:true})
        .then(data=>{
            console.log(data)
            return data._id
        })
        .catch(err=>{
            console.log("In service",err)
        });
};

module.exports={
    updateRole,
    createRoles
}