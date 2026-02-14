import express from 'express'
import { doctorlist, loginDoctor } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorlist)
doctorRouter.post('/login',loginDoctor)

export default doctorRouter;