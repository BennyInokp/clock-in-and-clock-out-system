import express from "express";
import {
  register,
  signin,
  

} from "../controller/user.js";
import auth from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/signin", signin);
userRouter.get("/logout")

export default userRouter;