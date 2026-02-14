import express from "express"
import {  bookAppointment, cancelAppointment, getUserProfile, listAppointment, paymentRazorpay, registerUser, updateUserProfile, userLogin, verifyPayment } from "../controllers/userController.js";
import { requireAuth } from "@clerk/express";

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.get('/get-profile',requireAuth(),getUserProfile)
userRouter.post('/update-profile',requireAuth(),updateUserProfile)
userRouter.post('/book-appointment',requireAuth(),bookAppointment)
userRouter.post('/list-appointments',requireAuth(),listAppointment)
userRouter.post('/cancel-appointment',requireAuth(),cancelAppointment)
userRouter.post('/payment-razorpay',requireAuth(),paymentRazorpay)
userRouter.post('/verify-payment',requireAuth(),verifyPayment)

export default userRouter;