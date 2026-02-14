import express from "express";
import {  addDoctor,  adminAppointment,  adminLogin,  allDoctors} from "../controllers/admincontroller.js";
import upload from "../middlewares/multer.js";
import { doctorAvailable } from "../controllers/doctorController.js";
import { authAdmin } from "../middlewares/authAdmin.js";



//all routes
const adminrouter = express.Router();
adminrouter.post("/add-doctor", upload.single("image"), authAdmin, addDoctor);
adminrouter.post("/all-doctors", authAdmin, allDoctors);
adminrouter.post("/login", adminLogin);
adminrouter.post("/check-availablity", authAdmin,doctorAvailable);
adminrouter.get('/all-appointment',authAdmin,adminAppointment)

export default adminrouter;
