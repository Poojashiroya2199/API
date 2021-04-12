const {Router}=require("express");
const userMiddleware=require("./userMiddleware");
const authMidddleware=require("./authMiddleware");
const deptMiddleware=require("./deptMiddleware");
const rolesMiddleware=require("./rolesMiddleware");


module.exports=()=>{
    const middleware=Router();
    middleware.use("/auth",authMidddleware());
    middleware.use("/department",deptMiddleware());
    middleware.use("/roles",rolesMiddleware());
    middleware.use("/user",userMiddleware());

    return middleware;
}