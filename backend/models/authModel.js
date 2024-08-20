// const mongoose = require ("mongoose");

// const authSchema = new mongoose.Schema({
//     // Common fields for both types of users
//     name: { type: String, trim: true },
//     email: { type: String, trim: true },
//     password: { type: String, trim: true },
//     role: { type: Number, default: 0 },
//     otp: { type: Number },
//     isVerified: { type: Boolean },

//     // Fields specific to Google OAuth users
//     googleId: { type: String },
//     displayName: { type: String },
//     image: { type: String }
// }, { timestamps: true });

// // Conditional validation based on presence of googleId
// authSchema.path('googleId').validate(function (value) {
//     if (value) {
//         // Google OAuth user, no password required
//         this.password = undefined;
//     } else {
//         // Regular user, require password
//         return this.password && this.password.length >= 6;
//     }
// }, 'Password is required for regular user');

// const authModel = mongoose.model('authModel', authSchema);
// module.exports = authModel;





const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  // Common fields for both types of users
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true },
  role: { type: Number, default: 0 },
  otp: { type: String },  // Changed to String to handle leading zeros
  isVerified: { type: Boolean, default: false },  // Added default value

  // Fields specific to Google OAuth users
  googleId: { type: String },
  displayName: { type: String },
  image: { type: String },
}, { timestamps: true });

// Conditional validation based on presence of googleId
authSchema.path('password').validate(function (value) {
  if (!this.googleId) {
    // Regular user, require password
    return value && value.length >= 6;
  }
  // Google OAuth user, no password required
  return true;
}, 'Password is required for regular users and must be at least 6 characters long.');

const authModel = mongoose.model('authModel', authSchema);
module.exports = authModel;
