


import Employee from "../model/Employee.js";
import Admin from "../model/Admin.js"; // Import the Admin model
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


// Create Employee

export const createEmployee = async (req, res) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken) {
    return res.status(404).json({ message: "Token Not Found" });
  }

  try {
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET_KEY);
    //const adminId = decoded.id;
    if (!decoded || !decoded.id) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const adminId = decoded.id;

    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ message: "Invalid adminId" });
    }

      // Include the admin field in the request data
    const { fullName, department, contact } = req.body;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const employee = await Employee.create({
      admin: adminId, // Use the adminId to create employee
      fullName,
      department,
      contact,
    });

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