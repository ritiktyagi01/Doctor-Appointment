import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import adminrouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';


//app configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());//parse json data
app.use(cors()); //enable CORS for all routes
app.use(express.urlencoded({ extended: true })); // parse form data

//routes endpoints
//http://localhost:5000/api/admin/add-doctor  
//http://localhost:5000/api/admin/login
app.use('/api/admin',adminrouter);

//http://localhost:5000/api/doctor/list
app.use('/api/doctor',doctorRouter)


//http://localhost:5000/api/user/login
app.use('/api/user',userRouter)





//default route
//http://localhost:5000/
app.get('/',(req,res)=>{
    res.send("server is running");
});

//server listener
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
