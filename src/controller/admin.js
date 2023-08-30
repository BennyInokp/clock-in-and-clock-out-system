import Admin from "../model/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addAdmin = async (req, res, next) => {
  const { email, password, role } = req.body;
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "password is less than 8 characters" });
  }
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  if (email.indexOf("@") === -1) {
    return res.status(400).json({ message: "invalid email" });
  }
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      await Admin.create({
        email,
        password: hash,
        role,
        
       }).then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: maxAge }
        );
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ message: "User successfully created", user });
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "User not successfully created",
      error: err.message,
    });
  }
};

export const adminSignin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try {
    existingUser = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Admin not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const maxAge = 3 * 60 * 60;

  const token = jwt.sign(
    { id: existingUser._id, email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: maxAge }
  );
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

  return res
    .status(200)
    .json({
      message: "Authentication Complete",
      token,
      id: existingUser._id,
      existingUser,
    });
};

export const getAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (err) {
    return console.log(err);
  }
  if (!admins) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ admins });
};

export const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await Admin.findById(id)
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return console.log("Cannot find Admin");
  }
  return res.status(200).json({ admin });
};
