const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const config =require("./config");
const router=require("./router");
const initialiseDB=require("./db");
initialiseDB();
const app=express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({exposedHeaders:["Authorization"]}));
app.use("/v1",router());

app.get("/",(req,res)=>{
    res.send("hello");
});
app.listen(config.port,()=>{
    console.log("server listen on http://localhost:"+config.port);
});