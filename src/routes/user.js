import express from "express";
import {
  register,
  signin,
  profile,
  updateProfile,
  

} from "../controller/user.js";
import auth from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/signin", signin);
userRouter.get("/profile/:id", auth, profile);
userRouter.put("/updateProfile", updateProfile)

export default userRouter;