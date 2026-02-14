import express from "express";
import {  addDoctor,  adminAppointment,  adminLogin,  allDoctors, dashboardData} from "../controllers/admincontroller.js";
import upload from "../middlewares/multer.js";
import { doctorAvailable } from "../controllers/doctorController.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { appointmentCancel } from "../controllers/userController.js";



//all routes
const adminrouter = express.Router();
adminrouter.post("/add-doctor", upload.single("image"), authAdmin, addDoctor);
adminrouter.post("/all-doctors", authAdmin, allDoctors);
adminrouter.post("/login", adminLogin);
adminrouter.post("/check-availablity", authAdmin,doctorAvailable);
adminrouter.get('/all-appointment',authAdmin,adminAppointment)
adminrouter.post('/appointment-canncel',authAdmin,appointmentCancel)
adminrouter.get('/dashboard',authAdmin,dashboardData)
export default adminrouter;
