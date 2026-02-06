import jwt from "jsonwebtoken"

//middleware to verify admin token
const authAdmin = (req,res,next)=>{
     
    try {  const token = req.headers.authorization;
    if(!token){
        return res.json({success:false, message:"no token provided"});
    }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       if(decoded !== process.env.ADMIN_EMAIL+process.env.AMIN_PASSWORD) {
        return res.json({success:false, message:"invalid token"});
       } 
        req.admin = decoded;
        next();
    }
    catch (error) {
        res.json({success:false, message:"invalid token"});
    }       
}

export default authAdmin;