import express from "express";
import {
  clockout,
  clockin
} from "../controller/clocking.js";
import auth from "../middleware/auth.js";


const clockingRouter = express.Router();



clockingRouter.post("/clockin", auth, clockin);
clockingRouter.post("/clockout", auth, clockout);


export default clockingRouter;
