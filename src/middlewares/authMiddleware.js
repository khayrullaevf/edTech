const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Student = require("../models/Student");

// JWT himoya (Token borligini tekshiradi)
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.student = await Student.findById(decoded.id).select("-password");

      if (!req.student) {
        res.status(401);
        throw new Error("Foydalanuvchi topilmadi!");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Noto‘g‘ri token!");
    }
  }

  if (!token) {
    res.status(401);
    res.status(401).json({ message: "Tokin yo'q ruhsat berilmaydi!" });
  }
});

// dminlarni tekshiruvchi middleware
const admin = (req, res, next) => {
  if (req.student && req.student.role === "admin") {
    next();
  } else {
    res.status(403);
    res.status(403).json({ message: "Admin ruxsati talab qilinadi!" });
  }
};

module.exports = { protect, admin };
