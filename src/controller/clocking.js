import Clocking from '../model/Clocking.js';
import Employee from '../model/Employee.js'; // Import the Employee model

export const clockin = async (req, res) => {
  try {
    const { employee_id } = req.body;
// Check if the provided employee_id exists in the Employee collection
    const existingEmployee = await Employee.findById(employee_id);
if (!existingEmployee) {
      return res.status(400).json({ message: 'Employee not found' });
    }
// Check if the employee has already clocked in today
    const existingClockin = await Clocking.findOne({
      employee: employee_id,
      timestamp: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    });

    if (existingClockin) {
      return res
        .status(400)
        .json({ message: 'Employee has already clocked in for today' });
    }

    // Create a new Clocking document to record the clock-in time
    const newClockin = await Clocking.create({
      employee: employee_id,
      type: 'in', // Assuming this is a clock-in
    });
  res.status(201).json({ message: 'Clock-in successful', clockin: newClockin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to clock in', error: error.message });
  }
};


    

export const clockout = async (req, res) => {
  try {
    const { employee_id } = req.body;

    // Check if the provided employee_id exists in the Employee collection
    const existingEmployee = await Employee.findById(employee_id);
    if (!existingEmployee) {
      return res.status(400).json({ message: 'Employee not found' });
    }

    // Find the last clock-in entry for the employee for today
    const lastClockin = await Clocking.findOne({
      employee: employee_id,
      timestamp: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
      type: 'in', // Assuming 'in' is for clock-in and 'out' is for clock-out
    }).sort({ timestamp: -1 }); // Sort by timestamp in descending order to get the latest entry

    if (!lastClockin) {
      return res.status(400).json({ message: 'Employee has not clocked in today' });
    }

    // Update the last clock-in entry to record the clock-out time
    lastClockin.type = 'out',
    lastClockin.timestamp = new Date();
    await lastClockin.save();

    res.status(200).json({
      message: 'Clock-out successful',
      clockoutTime: lastClockin.timestamp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to clock out', error: error.message });
  }
};