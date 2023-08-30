import Clock from "../model/Clock.js";
 import Employee from "../model/Employee.js";

 export const clockIn = async (req, res, next) => {
   console.log(req.employee); 
  try {
    // if (req.employee !== 'existingEmployee') {
    //   return res.status(403).json({ message: 'You are not authorized to clock in' });
    // }
    // const employee = await Employee.findOne({ _id: req.employee_id });
    // if (!employee) {
    //   return res.status(404).json({ message: 'Employee not found' });
    // }
    
     // Get the current date at the start of the day
    const today = new Date();
    console.log(today);
    today.setHours(currentTime);

    console.log(today);
    
    const existingLog = await Clock.findOne({
      employee: req.employee._id,
      timestamp: { $gte: today },
      type: 'in',
    });

    if (existingLog) {
      return res.status(400).json({ message: 'You have already clocked in today' });
    }
    
    const clockIn = new Clock({
      employee: req.employee._id,
      timestamp: currentTime,
      type: 'in',
    });

    await clockIn.save();
    res.status(201).json({ message: 'Clock-in recorded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(res.status(500).json({ error: 'Internal server error' }))
  }
};


    export const clockOut = async (req, res, next) => {
      try {
        // Check if the employee is authorized to clock out (e.g., employee role)
        if (req.employee!== 'existingEmployee') {
          return res.status(403).json({ message: 'You are not authorized to clock out' });
        }
    
        // Find the logged-in employee
        const employee = await Employee.findOne({ _id: req.employee_id });
        if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
        }
    
        // Get the current date at the start of the day
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        // Check if the employee has already clocked out today
        const existingLog = await Clock.findOne({
          employee: req.employee._id,
          timestamp: { $gte: today },
          type: 'out',
        });
    
        if (existingLog) {
          return res.status(400).json({ message: 'You have already clocked out today' });
        }
    
        // Create a new clock-out log
        const clockOut = new Clock({
          employee: req.employee._id,
          type: 'out',
        });
    
        await clockOut.save();
        res.status(201).json({ message: 'Clock-out recorded successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    