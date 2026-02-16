//add

import doctorModel from "../models/doctorSchema.js";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentSchema.js";
import { clerkClient } from "@clerk/express";
import userModel from "../models/userSchema.js";

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
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invaild credientials" });
    }

    const isMatch = await bycrpt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invaild credientials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

//api to get the appointment of doctor for doctor panel

//Api to get doctor appointment
export const doctorAppointment = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });
    if (!appointments) {
      res.json({ success: false, message: "No appointments" });
    }

    res.json({ success: true, message: "List of Appointments", appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Api for mark appoinment to complete for doctor panel
export const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { isCompleted: true },
      { new: true },
    );
return res.json({ success: true, message: "Appointment completed" });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Api for mark appointment to cancel for doctor panel
export const appointmentCancelled = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { cancelled: true },
      { new: true },
    );
    return res.json({ success: true, message: "Appointment Cancelled!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//api to get doctor dashboard
export const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointment: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//api to get doctor profile data
export const doctorProfile = async (req,res) => {
  try {
    const docId = req.docId;
    const profileData = await doctorModel.findById(docId).select('-password');
    res.json({success:true,message:"Doctor Profile",profileData})
    
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//api to update the doctor profile
export const updateProfile = async (req,res) => {

  try {
    const {docId} =req.docId;
    const{fees,address,available}=req.body;

    await doctorModel.findByIdAndUpdate(docId,{fees,available,address})
    res.json({success:true,message:'Profile Updated!'})
    
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  
}

//api to get the userdata
export const doctorPatients = async (req, res) => {
  try {
    const docId = req.docId;

    const appointments = await appointmentModel.find({ docId });
    console.log("Appointments:", appointments.length);
console.log("Appointments Data:", appointments);


    // Remove duplicates using Map
    const uniquePatientsMap = new Map();

    appointments.forEach((item) => {
      if (!uniquePatientsMap.has(item.userId)) {
        uniquePatientsMap.set(item.userId, item.userData);
      }
    });

    const patients = Array.from(uniquePatientsMap.values());
    console.log("Unique Patients:", patients);


    res.json({
      success: true,
      message: "Patients list",
      patients,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

