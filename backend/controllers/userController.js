import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorSchema.js";
import appointmentModel from "../models/appointmentSchema.js";
import { clerkClient } from "@clerk/express";
import Razorpay from "razorpay";

//Api to register the use

const registerUser = async (req, res) => {
  try {
    const { userId } = req.auth;   // From requireAuth()

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    // Get full user from Clerk
    const user = await clerkClient.users.getUser(userId);

    // Check if already exists in DB
    const existingUser = await userModel.findOne({ clerkId: userId });
    if (existingUser) {
      return res.json({
        success: true,
        message: "User already exists"
      });
    }

    // Create user object
    const newUser = new userModel({
      userId,
      name: `${user.firstName || ""} ${user.lastName || ""}`,
      email: user.emailAddresses[0]?.emailAddress,
      image: user.imageUrl,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User saved successfully"
    });

  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

//api to login the user
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    const user = await userModel.findOne({ email });

    //if i want to compare only email not password
    // const normalizedEmail = email.toLowerCase().trim();
    //   const  user  = await userModel.findOne({ normalizedEmail });
    //  if(user){
    //   const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
    //       expiresIn: "1d",
    //     });
    //     res.json({ success: true, message: "user login successful", token });
    //   } else {
    //     res.json({ success: false, message: "user login failed" });
    //   }
    // }
    //  catch (error) {
    //   console.error(error);
    //   res.json({
    //     success: false,
    //     message: error.message,
    //   });

    //  }

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({ success: true, message: "user login successful", token });
    } else {
      res.json({ success: false, message: "user login failed" });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api to get user Profile
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.auth();
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);
    const dbUser = await userModel.findOne({ clerkId: userId });

    const userData = {
      name: `${user.firstName || ""} ${user.lastName || ""}`,
      email: user.emailAddresses[0]?.emailAddress || "",
      image: user.imageUrl || "",
      phone: dbUser?.phone || "",
      address: dbUser?.address || { line1: "", line2: "" },
      gender: dbUser?.gender || "",
      dob: dbUser?.dob || "",
    };

    res.json({ success: true, userData });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


//api update userprofile
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.auth();
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { phone, address, dob, gender } = req.body;

    if (!phone || !dob || !gender) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    await userModel.findOneAndUpdate(
      { clerkId: userId },
      {
        phone,
        address: JSON.parse(address),
        gender,
        dob,
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "User profile updated",
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


 

//api to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { docId, slotDate, slotTime } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

     const user = await clerkClient.users.getUser(userId);
    const dbUser = await userModel.findOne({ clerkId: userId });

    const userData = {
      name: `${user.firstName || ""} ${user.lastName || ""}`,
      email: user.emailAddresses[0]?.emailAddress || "",
      image: user.imageUrl || "",
      phone: dbUser?.phone || "",
      address: dbUser?.address || { line1: "", line2: "" },
      gender: dbUser?.gender || "",
      dob: dbUser?.dob || "",
    };
console.log(userData)
    const docData = await doctorModel.findById(docId);

    const appointmentData = {
      userId,
      userData,
      docData,
      docId,
      slotDate,
      slotTime,
      amount: docData.fees,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to get list of appointment
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.auth();
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, message: "list of Appointments", appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//api to cancel the appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized user" });
    }

    // Mark cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Release slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (time) => time !== slotTime,
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to get the payment by razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: appointmentId,
    };

    const order = await razorpayInstance.orders.create(options);

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//Api To verify the payment
const verifyPayment = async (req, res) => {
  try {
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    res.json({ orderInfo });

    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment Successfull" });
    } else {
      res.json({ success: false, message: "Payment Unsuccessfull" });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  registerUser,
  userLogin,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyPayment,
  updateUserProfile,getUserProfile
};
