import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.js";
import cors from "cors";
import adminRouter from "./src/routes/admin.js";
 import employeeRouter from "./src/routes/employee.js";
import clockingRouter from "./src/routes/clocking.js";
 //import crypto from 'crypto'


dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// middlewares
app.use(cors());
app.use(express.json());
 app.use("/admin", adminRouter);
app.use("/employee", employeeRouter);
app.use("/clocking",clockingRouter )



async function connect() {
  try {
    app.listen(7100, () => {
      connectDB(process.env.MONGODB_PASSWORD);
      console.log("server is running on  port 7100");
    });
  } catch (err) {
    console.log(err);


  }
}
connect();

//to generate jwt token

// const secrectkey = crypto.randomBytes(32).toString('hex');
// console.log(secrectkey);