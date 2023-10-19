import express from "express";
import {
  createEmployee,
  listEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controller/employee.js";
import auth from "../middleware/auth.js";

const employeeRouter = express.Router();
employeeRouter.get("/", auth, listEmployees);
employeeRouter.put("/:id", auth, updateEmployee);
employeeRouter.delete("/:id", auth, deleteEmployee);
employeeRouter.post("/", auth, createEmployee);

export default employeeRouter;