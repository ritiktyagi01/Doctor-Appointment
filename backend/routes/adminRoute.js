import express from 'express'
import { addDoctor, adminLogin } from '../controllers/admincontroller.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
const adminrouter = express.Router();
adminrouter.post('/add-doctor',upload.single('image'),authAdmin,addDoctor);
adminrouter.post('/login',adminLogin);

export default adminrouter;