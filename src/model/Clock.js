import mongoose from "mongoose";

const clockSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
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
  // Other log-related fields.
});

export default mongoose.model("Clock", clockSchema);