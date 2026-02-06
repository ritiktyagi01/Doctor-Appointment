import validator from "validator";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorSchema.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

// add doctor

const addDoctor = async (req, res) => {
  try {
    //destructure doctor data from request body
    const { name, email, password, speciality, degree, address, fees } =req.body;
      
      
    // 🔴 Image check FIRST
    if (!req.file) {
      return res.json({
        success: false,
        message: "Doctor image is required",
      });
    }
    const imagePath = req.file.path;

    //validations
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !address ||
      !fees
    ) {
      return res.json({ success: false, message: "All fields are required" });
    }

    //check if email is not in valid format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    //check if password is less than 6 characters or strong password
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    //hashing doctor password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save the image in cloudinary and get the url of the image

    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
      folder: "prescripto",
    });

    const imageUrl = result.secure_url;

    //create doctor object and save to database
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      address: JSON.parse(address),
      fees,
      image: imageUrl,
      date: new Date(),
    };


    const doctor = new doctorModel(doctorData);
    await doctor.save();
    res.json({ success: true , message: "doctor added successfully" });
  }
   catch (error) {
    console.error("Error in addDoctor:", error);
    res.json({
      success: false,
      message: "error on adding doctor",
      error: error.message,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    console.log("Admin login attempt with data:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    if ( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {
      const token = jwt.sign(
        {
          email: process.env.ADMIN_EMAIL,
          role: "admin",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      res.json({ success: true, message: "admin login successful", token });
    } else {
      res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "error on admin login",
      error: error.message,
    });
  }
};

export { addDoctor, adminLogin };
