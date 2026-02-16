import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    // extract token
    const dtoken = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    // // check admin role
    // if (decoded.role !== "") {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Access denied",
    //   });
    // }

   req.docId = decoded.id;// attach admin data
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};



export {authDoctor} ;
