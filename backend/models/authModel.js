const mongoose = require ("mongoose");

const authSchema = new mongoose.Schema({
    // Common fields for both types of users
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true },
    role: { type: Number, default: 0 },
    otp: { type: Number },
    isVerified: { type: Boolean },

    // Fields specific to Google OAuth users
    googleId: { type: String },
    displayName: { type: String },
    image: { type: String }
}, { timestamps: true });

// Conditional validation based on presence of googleId
authSchema.path('googleId').validate(function (value) {
    if (value) {
        // Google OAuth user, no password required
        this.password = undefined;
    } else {
        // Regular user, require password
        return this.password && this.password.length >= 6;
    }
}, 'Password is required for regular user');

const authModel = mongoose.model('authModel', authSchema);
module.exports = authModel;
