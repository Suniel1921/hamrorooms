// Importing required modules and libraries
const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require('nodemailer');

// Function to send OTP via email
const sendOTPByEmail = async (otp, email) => {
  try {
    // Creating a nodemailer transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { 
        user: process.env.MYEMAIL,
        pass : process.env.PASSWORD
      },
    });

    // Email options for sending OTP
    const mailOptions = {
      from: 'sunielsharma1921@gmail.com',
      to: email,
      subject: 'Welcome to Hamro Rooms - OTP Verification and Registration',
      html: `
        <p>Dear User,</p>
        <p>Thank you for registering on Hamro Rooms. Your OTP for registration is: <strong>${otp}</strong></p>
        <p>Welcome to our platform, and we appreciate your choice!</p>
        <p>Best regards,<br/>The Hamro Rooms Team</p>
      `,
    };
    
    // Sending the email with OTP
    const emailResult = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', emailResult.response);

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    // console.error(`Error sending email: ${error}`);
    return { success: false, message: `Error sending email: ${error}` };
  }
};

// Controller for user registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation check
    if (!name || !email || !password) {
      return res.status(400).send({ success: false, message: 'All Fields are required' });
    }

    // Check if the user already exists
    const userExists = await authModel.findOne({ email });
    if (userExists) {
      return res.status(400).send({ success: false, message: 'User already exists!' });
    }

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Hashing user password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save the new user in the database
    const newUser = await authModel.create({ name, email, password: hashPassword, otp });

    // Send OTP via email
    const emailResult = await sendOTPByEmail(otp, email);

    if (!emailResult.success) {
      // If email sending fails, handle it accordingly
      return res.status(500).send(emailResult);
    }

    return res.status(201).send({ success: true, message: 'OTP sent via email.', newUser });
  } catch (error) {
    // console.error(error);
    return res.status(500).send({ success: false, message: `Error while registering user` });
    // return res.status(500).send({ success: false, message: `Error while registering user: ${error}` });
  }
};

// Verify user OTP
exports.verifyOTP = async (req, res) => {
    // console.log('Received Data:', req.body);
    try {
      const { email, otp } = req.body;
  
      // Find the user by email (case-insensitive search)
      const user = await authModel.findOne({ email: { $regex: new RegExp(email, 'i') } });
  
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' });
      }
  
      // Check if the provided OTP matches the stored OTP
      if (user.otp && otp === user.otp.toString()) {
        await authModel.findByIdAndUpdate(user._id, { $set: { isVerified: true } });
  
        return res.status(200).send({ success: true, message: 'OTP verification successful Please Login to proceed' });
      } else {
        return res.status(400).send({ success: false, message: `Invalid OTP` });
      }
    } catch (error) {
      // console.error(error);
      return res.status(500).send({ success: false, message: `Error during OTP verification` });
      // return res.status(500).send({ success: false, message: `Error during OTP verification: ${error}` });
    }
  };

// Login controller
exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
          return res.status(406).send({ success: false, message: "All Fields are required !" });
      }

      // Check if user exists in the database
      const userExit = await authModel.findOne({ email });

      if (!userExit) {
          return res.status(404).send({ success: false, message: "Invalid Email or Password !" });
      }

      // Check if the user is verified
      if (!userExit.isVerified) {
          return res.status(401).send({ success: false, message: "User not verified. Please verify your account." });
      }

      // Check if the entered password matches the stored password
      const passMatch = await bcrypt.compare(password, userExit.password);

      if (!passMatch) {
          return res.status(400).send({ success: false, message: "Invalid Email or Password !" });
      }

      // Generate token
      const token = await JWT.sign({ _id: userExit._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

      return res.status(200).send({
          success: true,
          message: "Login Successfully",
          userExit: {
              name: userExit.name,
              email: userExit.email,
          },
          token
      });

  } catch (error) {
      return res.status(500).send({ success: false, message: "Error while logging user" });
  }
}

// Protected route controller
exports.protectedRoute = async (req, res) => {
    res.status(200).send({ ok: true });
}

// Admin route controller
exports.admin = (req, res) => {
  res.status(200).send({ ok: true });
}


// ***************get all users in admin dashboard*************
exports.getAllUsers = async (req, res) => {
  try {
    // const allUsers = await authModel.find({}, { password: 0 });
    const allUsers = await authModel.find().select('-password');
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    return res.status(200).send({ success: true, message: "All User Found", allUsers });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Internal server error"});
  }
};



//get total user and showing admin dashboard

exports.totalUserCount = async (req, res) => {
  try {
    const totalUsers = await authModel.find();
    const count = totalUsers.length;
    res.status(200).json({ success: true, message: "rooms fetched successfully", totalUsers, count });
  } catch (error) {
    console.error('Error fetching user rooms:', error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};





