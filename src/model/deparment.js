const mongoose=require("mongoose");
const departmentSchema = new mongoose.Schema({
    title:{
        type:String,
        // required:true
    },
    description:{
        type:String,
    },
    users:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User'
    },
    roles:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Role'
    }
})

const Department = mongoose.model('Department',departmentSchema)
module.exports=Department;