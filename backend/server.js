const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnection = require("./config/database");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const fileUpload = require("./routes/fileUploadRoute");
const path = require('path');
const fileupload = require("express-fileupload");

// Middleware for file upload
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: './tmp' 
  })
);

// Middleware for cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connection
dbConnection();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for serving static files
const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

// Middleware for CORS
// app.use(cors({
//   origin: ['http://54.209.249.7:8000', 'http://localhost:5173'],
//   methods: '*' // Allow all methods
// }));

app.use(cors({
  origin: "*",
  methods: '*' // Allow all methods
}));

console.log("CORS middleware configured successfully");





// API routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use('/api/v1/upload', fileUpload);

// Default route to serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port no : ${PORT}`);
// });


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port no : ${PORT}`);
});

