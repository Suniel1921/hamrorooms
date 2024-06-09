const express = require("express");
const logger = require ("./logger");
const app = express();
const dotenv = require("dotenv");
const dbConnection = require("./config/database");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const fileUpload = require("./routes/fileUploadRoute");
const fileupload = require("express-fileupload");

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connection
dbConnection();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for file upload
app.use(fileupload({ useTempFiles: true, tempFileDir: './temp' }));

// Middleware for cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// CORS middleware
app.use(cors({
  origin: "*",
  methods: '*' // Allow all methods
}));

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// API routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use('/api/v1/upload', fileUpload);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to hamro rooms");
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port no : ${PORT}`);
});
