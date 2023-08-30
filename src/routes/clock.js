import express from "express";
import {
  clockIn,
  clockOut,
} from "../controller/clock.js";
import auth from "../middleware/auth.js";


const clockRouter = express.Router();



clockRouter.post("/in", clockIn);
clockRouter.post("/out", clockOut);


export default clockRouter;
