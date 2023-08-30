import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  // Other user fields like name, profile picture, etc.
});

export default mongoose.model("User", userSchema);