import express from 'express'
import { appointmentCancelled, appointmentComplete, doctorAppointment, doctorDashboard, doctorlist, doctorPatients, doctorProfile, loginDoctor, updateProfile } from '../controllers/doctorController.js';
import { authDoctor } from '../middlewares/authDoctor.js';
import { requireAuth } from "@clerk/express";

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorlist)
doctorRouter.post('/login',loginDoctor);
doctorRouter.get('/appointments',authDoctor,doctorAppointment);
doctorRouter.post('/appointment-completed',authDoctor,appointmentComplete)
doctorRouter.post('/appointment-cancelled',authDoctor,appointmentCancelled)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateProfile)
doctorRouter.get('/patients', authDoctor, doctorPatients)

 
export default doctorRouter;