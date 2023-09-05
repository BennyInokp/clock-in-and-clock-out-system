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
  // Other log-related fields.
});

 export default mongoose.model("Clocking", clockingSchema);

// import Sequelize  from "sequelize";
// import db from "../config/sequelize.js";

// const Checking = db.define('checking', {
//   id: {
//     type: Sequelize.DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   client_id: {
//     type: Sequelize.DataTypes.INTEGER,
//     allowNull: false,
//   },
//   checkinTime: {
//     type: Sequelize.DataTypes.DATE,
//     allowNull: false,
//   },
//   checkoutTime: {
//     type: Sequelize.DataTypes.DATE,
//   },
// });

// // export default Checking;

// const clockingSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: true,
//   },

//   employee: {
//         type: String,
//         ref: 'Employee',
//        required: true,
//       },
  
//   clockinTime: {
//     type: Date,
//     required: true,
//   },
//   clockoutTime: {
//     type: Date,
//   },
// });

// // const Clocking = mongoose.model("Clocking", ClockingSchema);

// // export default Clocking;

// export default mongoose.model("Clocking", clockingSchema);
