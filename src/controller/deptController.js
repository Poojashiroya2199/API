const {Router}=require("express");
const {createDepartment,updateDepartment,deletedepartment}=require("./../services/deptServices/dept");
const {DeptCreationError, InternalServerError}=require("./../util/errors");

module.exports=()=>{
    const deptApi=Router();
    deptApi.post("/",(req,res,next)=>{
        const dept=req.body
        createDepartment(dept)
        .then(id=>{
            res.status(201).json({
                id,
                message:"Department successfully created"
            })
        })
        .catch(err=>{
            console.log(err);
            next(new DeptCreationError("Dept creation unsuccessful"))
        })
    })
    deptApi.put("/:id",(req,res,next)=>{
        const deptId=req.params.id;
        updateDepartment(req.body,req.department)
        .then(id=>res.status(200).json({
            id,
            message:"successfully updated"
        }))
        .catch(err=>{
            console.log(err);
            next(new InternalServerError("error in updation"));
        })
    });
    deptApi.delete("/:id",async(req,res)=>{
        const id=req.params.id;
        await deletedepartment(id)
        .then(data=>{
            console.log(data);
            res.send(data);
        })
        .catch(err=>console.log(err));
    })
    return deptApi;
}