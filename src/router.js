const {Router}=require("express");
const userController=require("./controller/userController");
const router=Router();
const middleware=require("./middleware");
const authController=require("./controller/authController");
const rolesController=require("./controller/rolesController");
const deptController=require("./controller/deptController");
module.exports = ()=>{
    router.use(middleware());
    router.use("/auth",authController());
    router.use("/department",deptController());
    router.use("/roles",rolesController());
    router.use("/user",userController());
    router.use("/",(req,res)=>{
        res.send("router");
    });
    router.use((err,req,res,next)=>{
        console.log(err);
        // res.send(err);
        const error = (err.message);
        console.log("Error",error );
        // //Response Generation
         res.status(error.statusCode).json({code:error.code,message:error.message})
    })
    return router;
}