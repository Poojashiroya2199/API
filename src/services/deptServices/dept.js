const Department =require("./../../model/deparment");

const createDepartment=(data)=>{
    const dept=new Department(data)
    return dept.save().then(data=>data._id).catch(err=>console.log(err));
}
const updateDepartment=(newDepartment,oldDepartment)=>{
    const updatedData={...oldDepartment,...newDepartment}
    return Department.findByIdAndUpdate(oldDepartment._id,updatedData).then(data=>data._id)
}

module.exports={
    createDepartment,
    updateDepartment
}