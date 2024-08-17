const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require('nodemailer');

// Temporary in-memory store for user data
const tempUserStore = new Map(); 

// Function to send OTP via email
const sendOTPByEmail = async (otp, email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { 
        user: process.env.MYEMAIL, // Use MYEMAIL environment variable
        pass: process.env.PASSWORD // Use PASSWORD environment variable
      },
    });

    const mailOptions = {
      from: 'sunielsharma1921@gmail.com',
      to: email,
      subject: 'Welcome to Hamro Rooms - OTP Verification and Registration',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <div style="text-align: center; padding: 20px;">
          <img src="https://hamrorooms.com/logo/hamrorooms.png" alt="Hamro Rooms Logo" style="max-width: 150px; ;" />
          </div>
          <p>Dear ${name},</p>
          <p>Thank you for registering on <strong>Hamro Rooms</strong>. We are excited to have you join our community.</p>
          <p>Your One-Time Password (OTP) for registration is: <strong style="font-size: 18px; color: #3d82c5;">${otp}</strong></p>
          <p>To complete your registration, please enter this OTP in the verification form. This code is valid for the next 10 minutes.</p>
          <p>If you did not request this registration, please ignore this email. If you have any questions, feel free to contact us.</p>
          <p>Welcome to Hamro Rooms, and we appreciate your choice!</p>
          <p>Best regards,<br/>
          The Hamro Rooms Team</p>
          <div style="text-align: center; padding: 20px;">
            <small>If you have any questions, please contact us at <a href="mailto:info@hamrorooms.com">info@hamrorooms.com</a>.</small>
          </div>
        </div>
      `,
    };
    
    
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'OTP sent to email. Please verify to complete registration.' };
  } catch (error) {
    return { success: false, message: `Error sending email: ${error.message}` };
  }
};

// Register controller
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const userExists = await authModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);

    tempUserStore.set(email, { name, email, password: hashedPassword, otp });

    const emailResult = await sendOTPByEmail(otp, email, name);

    if (!emailResult.success) {
      return res.status(500).json(emailResult);
    }

    return res.status(200).json({ success: true, message: emailResult.message });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// OTP verification controller
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const userData = tempUserStore.get(email);
    if (!userData || userData.otp !== parseInt(otp)) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    const newUser = await authModel.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      isVerified: true,
    });

    tempUserStore.delete(email);

    return res.status(201).json({ success: true, message: 'OTP verification successful. User registered.', newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



// Forgot Password controller
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User does not exist' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    tempUserStore.set(email, { otp });

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.MYEMAIL, 
        pass: process.env.PASSWORD, 
      },
    });

    const mailOptions = {
      from: process.env.MYEMAIL, 
      to: email,
      subject: 'Password Reset OTP - HamroRooms',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://hamrorooms.com/logo/hamrorooms.png" alt="HamroRooms Logo" style="max-width: 150px;">
          </div>
          <p>Hello User,</p>
          <p>We received a request to reset the password for your HamroRooms account. If you did not request a password reset, please ignore this email.</p>
          <p>To reset your password, please use the following One-Time Password (OTP):</p>
          <p style="font-size: 18px; font-weight: bold; color: #3d82c5;">${otp}</p>
          <p>This code is valid for 10 minutes. Simply enter this code on the password reset page to create a new password for your account.</p>
          <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
          <p>Best regards,<br/>The HamroRooms Team</p>
        </div>
      `,
    };
    
    

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'OTP sent to email. Please verify to reset password.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Reset Password controller
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const userData = tempUserStore.get(email);
    if (!userData || userData.otp !== parseInt(otp)) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await authModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    tempUserStore.delete(email);

    return res.status(200).json({ success: true, message: 'Password reset successful.', user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
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
