const {Router}=require("express");
const Role=require("./../model/role");
const {RolesCreationError}=require("./../util/errors");
const {body,validationResult}=require("express-validator");

module.exports=()=>{
    const rolesMiddleware=Router();
    rolesMiddleware.post("/",body('title').notEmpty().isLength({min:3,max:25}),
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            console.log("Roles data is invalid");
            throw new RolesCreationError(errors.errors);
        }
        next();
    })
    rolesMiddleware.put("/:id",(req,res,next)=>{
        if(!req.body){
            throw new RolesCreationError("No request boddy available");
        }
        const id=req.params.id;
        Role.findById(id)
        .then(data=>{
            if(!data){
                throw new RolesCreationError("Error in updation");
            }
            req.role=data.toJSON()
            next()
        })
        .catch(err=>{
            console.log("In middleware",err);
            next(err.message)
        })
    })
    return  rolesMiddleware;
}