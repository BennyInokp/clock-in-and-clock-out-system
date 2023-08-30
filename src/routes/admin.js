import express from "express";
import {
  addAdmin,
  adminSignin,
  getAdminById,
  getAdmins,
} from "../controller/admin.js";


const adminRouter = express.Router();

adminRouter.post("/register", addAdmin);
adminRouter.post("/signin", adminSignin);
adminRouter.get("/", getAdmins);
adminRouter.get("/:id", getAdminById);

export default adminRouter;