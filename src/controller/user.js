import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";


export const register = async (req, res, next) => {
  const { fullName, email, password, contact, gender, picture } = req.body;
  
  if (!fullName || !email || !password || !contact || !gender || !picture) {
    return res.status(400).json({ message: "all fields are required" });
  }
  if (email.indexOf("@") === -1) {
    return res.status(400).json({ message: "invalid email" });
  }
  if (email.indexOf(".") === -1) {
    return res.status(400).json({ message: "invalid email" });
  }
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        fullName,
        email,
        password: hash,
        contact,
        gender,
        picture,
        
      }).then((user) => {
        const maxAge = 365 * 24 * 60 * 60;
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const maxAge = 365 * 24 * 60 * 60;

  const token = jwt.sign(
    { id: existingUser._id, email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: maxAge }
  );
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

  return res
    .status(200)
    .json({ message: "Authentication Complete", token, id: existingUser._id, existingUser });
};

// logout
 export const user = express.Router();
user.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/");
});
