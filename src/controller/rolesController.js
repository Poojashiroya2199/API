const {Router}=require("express");
const {createRoles,updateRole,deleterole} =require("./../services/roleServices/roles");
const {InternalServerError,RolesCreationError}=require("./../util/errors");

module.exports=()=>{
    const rolesApi=Router();

    rolesApi.post('/',(req,res,next)=>{
        const role=req.body
        createRoles(role)
        .then(id=>{
            res.status(201).json({
                id,
                message:"Role successfully created"
            })
        })
        .catch(err=>{
            console.log(err)
            next(new RolesCreationError("DB error"))
        })
    })
    rolesApi.put("/:id",(req,res,next)=>{
        console.log(req.body,req.role)
        updateRole(req.body,req.role)
        .then(id=>res.status(200).json({
            id,
            message:"Roles successfully updated"
        }))
        .catch(err=>{
            console.log("In controller",err);
            next(new InternalServerError("Roles updation failed"))
        })
    });
    rolesApi.delete("/:id",async(req,res)=>{
        const id=req.params.id;
        await deleterole(id)
        .then(data=>{
            console.log(data);
            res.send(data);
        })
        .catch(err=>console.log(err));
    })
    return rolesApi;
}