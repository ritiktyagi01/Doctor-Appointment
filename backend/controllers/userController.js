import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";

//Api to resgister the use

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.json({ success: false, message: "missing details" });
  }

  //check if email is not in valid format
  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Invalid email format" });
  }

  //check if password is less than 6 characters or strong password
  if (password.length < 6) {
    return res.json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  //hashing doctor password before saving to database
  console.time("bcrypt");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.timeEnd("bcrypt");

  //create user object and to save in database
  const user = {
    name,
    email,
    password: hashedPassword,
  };

  //save user to database
  try {
    const savedUser = new userModel(user);
    await savedUser.save();
    const token = jwt.sign(
      {
        email,
        role: "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({ success: true, message: "user register successful", token });
   
  } catch (error) {
    console.error("Error in addDoctor:", error);
    res.json({
      success: false,
      message: "error on adding doctor",
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    const  user  = await userModel.findOne({ email });


    //if i want to compare only email not password
   // const normalizedEmail = email.toLowerCase().trim();
  //   const  user  = await userModel.findOne({ normalizedEmail });
  //  if(user){
  //   const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
  //       expiresIn: "1d",
  //     });
  //     res.json({ success: true, message: "user login successful", token });
  //   } else {
  //     res.json({ success: false, message: "user login failed" });
  //   }
  // }
  //  catch (error) {
  //   console.error(error);
  //   res.json({
  //     success: false,
  //     message: error.message,
  //   });
  
  //  }
     

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password); 

    if (isMatch) {
      const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({ success: true, message: "user login successful", token });
    } else {
      res.json({ success: false, message: "user login failed" });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser , userLogin};
