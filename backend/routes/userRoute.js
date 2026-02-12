import express from "express"
import {  bookAppointment, registerUser, userLogin } from "../controllers/userController.js";
import { requireAuth } from "@clerk/express";

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.post('/book-appointment',requireAuth(),bookAppointment)

export default userRouter;