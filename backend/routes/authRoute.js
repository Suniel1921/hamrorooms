// Importing required modules and dependencies
const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");


router.post("/login", controller.login);
router.post("/signup", controller.register);
router.post("/verifyOTP", controller.verifyOTP);
router.get("/proctedRoute", requireLogin, controller.protectedRoute);
router.get("/admin", requireLogin, isAdmin, controller.admin);

// ************getting all users in admin dashboard route ***************
router.get("/getAllUsers", requireLogin, isAdmin, controller.getAllUsers);
router.get("/totalUsers", requireLogin, isAdmin, controller.totalUserCount);





module.exports = router;
