import Clocking from "../model/Clocking.js";

  export const clockin = async (req, res) => {
    console.log(req.employee); 
    try {
      const { employee_id } = req.body;
  
      const existingClockin = await Clocking.findById({
        employee_id,
        clockingTime :{
    
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      });

    if (existingClockin) {
      return res
        .status(400)
        .json({ message: "Employee has already clocked in for today" });
    }
    const newClockin = await Clocking.create({
      employee_id,
      clockInTime: new Date(),
    });

    res
      .status(201)
      .json({ message: "Clock-in successful", clockin: newClockin });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to clock in", error: error.message });
  }
};


export const clockout = async (req, res ) => {
  try {
    const { employee_id } = req.body;

    const lastClockin = await Clocking.findById({
      where: {
        employee_id,
        clockoutTime: require,
      },
      order: [["clockinTime", "DESC"]],
    });

    if (!lastClockin) {
      return res
        .status(400)
        .json({ message: "Employee has not clocked in or already clocked out" });
    }
    lastClockin.clockoutTime = new Date();
    await lastClockin.save();

    res.status(200).json({
      message: "Clock-out successful",
      clockoutTime: lastClockin.clockoutTime,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to clock out", error: error.message });
  }
};

    

