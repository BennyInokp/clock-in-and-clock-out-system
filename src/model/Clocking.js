 import mongoose from "mongoose";

const clockingSchema = new mongoose.Schema({
  employee: {
    type: String,
    ref: 'Employee', 
   required: true,
  },
  
  timestamp: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['in', 'out'],
    required: true,
  },
  
});

 export default mongoose.model("Clocking", clockingSchema);


