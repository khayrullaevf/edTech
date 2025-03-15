const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const courseRoutes = require("./src/routes/courseRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const authRoutes = require("./src/routes/authRoutes");
const cors = require("cors");
app.use(cors());

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ishga tushdi: ${PORT}`));
