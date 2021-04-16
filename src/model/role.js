const mongoose=require("mongoose");

const roleSchema = new mongoose.Schema({
  title: {
    type: String,
    // requrired: true,
  },
  description: {
    type: String,
  },
  minExperience: {
    type: Number,
  },
  department: {
    type: [mongoose.Schema.Types.ObjectId],
    ref:'Department',
  },
  minCompensation: {
    type: Number,
  },
  maxCompensation: {
    type: Number,
  },
});


const Role = mongoose.model('Role',roleSchema)


module.exports= Role;