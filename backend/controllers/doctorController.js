//add

import doctorModel from "../models/doctorSchema.js";
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"

export const doctorAvailable = async (req, res) => {
  try {
    const { docId } = req.body;

    const doctor = await doctorModel.findById(docId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await doctorModel.findByIdAndUpdate(docId, {
      available: !doctor.available,
    });

    res.status(200).json({
      success: true,
      message: "Doctor availability updated successfully",
    });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const doctorlist = async (req, res) => {
  console.log("Doctor list route hit");

  try {
    const doctor = await doctorModel.find({}).select("-password -email");

    res.status(200).json({
      success: true,
      message: "Doctor list",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//Api to login on doctor side
export const loginDoctor = async (req,res) => {

  try {
    const {email, password} = req.body;
    const doctor = await doctorModel.findOne({email})
    
    if(!doctor){
      return res.json({success:false,message:"Invaild credientials"})
    }

    const isMatch = await bycrpt.compare(password,doctor.password)

    if(isMatch){
const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET);
res.json({success:true,token})
    }
    else{
      res.json({success:false,message:"Invaild credientials"})
    }

  } catch (error) {
    console.log(error)
      res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  
}

// export const doctorDelete = async (req, res) => {
//   try {
//     const { docId } = req.body;
//     const doctor = await doctorModel.findById(docId);
//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }
//     await doctorModel.findByIdAndDelete(docId);
//     res.json({
//       success: true,
//     )
// }
