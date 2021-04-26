const {Router}=require("express");
const Department =require("./../model/deparment");
const {DepartmentCreationError, InternalServerError} =require("./../util/errors");
const {body,validationResult}=require("express-validator");

module.exports=()=>{
    const deptMiddleware=Router();
   deptMiddleware.post("/",body('title').notEmpty().isLength({min:3,max:25}),
   (req,res,next)=>{
       const errors=validationResult(req);
       if(!errors.isEmpty()){
           console.log("Roles data is invalid");
           throw new DeptCreationError(errors.errors);
       }
       next();
   });

   deptMiddleware.put("/:id",(req,res,next)=>{
       const id=req.params.id
       Department.findById(id)
       .then(data=>{
           if(!data){
               throw new DeptCreationError("Department doesnt exist");
           }
           req.department=data.toJSON()
           next()
       })
       .catch(err=>{
           console.log(err);
           next(error.message);
       })
   })

   deptMiddleware.delete("/:id", (req,res,next)=>{
    const id=req.params.id;
    if(!id){
        throw new DeptCreationError("user not available to delete");
    }
    else{
        console.log("find user");
        next();
    }
})
   return deptMiddleware;
}