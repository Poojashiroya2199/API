const mongoose =require("mongoose");
const config =require("./config");
const DatabaseConnectionError=require("./util/errors");

const initialiseDB=()=>{
mongoose.connect(config.db_url,{useNewUrlParser: true, useUnifiedTopology: true})
.then(data=>{
    console.log("connection establish to database:"+config.db_name);
    //callback();
})
.catch(err=>{
    console.log("connection not establish to data base:"+config.db_name);
    throw new DatabaseConnectionError("Server Error");
})
}
initialiseDB();
module.exports=initialiseDB;