import Employee from "../model/Employee.js";
import jwt from "jsonwebtoken";

// Create Employee
export const createEmployee = async (req, res) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken) {
    return res.status(404).json({ message: "Token Not Found" });
  }

  try {
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET_KEY);
    const adminId = decoded.id;
console.log(adminId)
    const { fullName, department, contact } = req.body;
    const employee = await Employee.create({
      fullName,
      department,
      contact,
      adminId, // Use the adminId to create employee
    });
console.log(employee)
    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { fullName, department, contact} = req.body;
  try {
    // Update employee data by ID
    await Employee.findByIdAndUpdate(id, {fullName, department, contact})

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

    try {
    // Delete employee by ID
    await Employee.findByIdAndDelete(id);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const listEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};