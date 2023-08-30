import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  }, 
  // Other employee fields. 
});

export default mongoose.model("Employee", employeeSchema);