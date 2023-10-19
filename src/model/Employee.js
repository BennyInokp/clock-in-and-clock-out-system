import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  }, 
 
  
});

export default mongoose.model("Employee", employeeSchema);