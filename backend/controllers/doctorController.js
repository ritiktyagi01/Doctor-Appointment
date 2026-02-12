//add

import doctorModel from "../models/doctorSchema.js";

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
