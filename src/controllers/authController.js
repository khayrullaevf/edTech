const Student = require("../models/Student");
const asyncHandler = require("express-async-handler");
const { generateAccessToken, generateRefreshToken } = require("../utilis/generateToken");


// 🔹 Refresh Token orqali yangi Access Token olish
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token taqdim etilmagan!" });
  }

  // 🔹 Token bazada bormi yoki yo‘qligini tekshiramiz
  const student = await Student.findOne({ refreshToken });
  if (!student) {
    return res.status(403).json({ message: "Yaroqsiz refresh token!" });
  }

  // 🔹 Refresh Token ni tekshiramiz
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Refresh token muddati tugagan!" });
    }

    // 🔹 Yangi Access Token yaratamiz
    const accessToken = generateAccessToken(decoded.id);
    res.status(200).json({ accessToken });
  });
});

// Ro‘yxatdan o‘tish (Register)
const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  //  1. Foydalanuvchi mavjudligini tekshiramiz
  const studentExists = await Student.findOne({ email });
  if (studentExists) {
    return res.status(400).json({ message: "Bu email allaqachon ishlatilgan!" });
  }



  // 2. Yangi foydalanuvchini yaratish
  const student = await Student.create({
    name,
    email,
    password,
    role: role || "student",
  });

  //  3. Yangi foydalanuvchi muvaffaqiyatli yaratilsa, token qaytaramiz
  if (student) {
    const accessToken = generateAccessToken(student._id);
    const refreshToken = generateRefreshToken(student._id);

    student.refreshToken = refreshToken;
    await student.save(); 

    res.status(201).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        accessToken,
        refreshToken,  
    });
  } else {
    res.status(400).json({ message: "Xatolik! Talaba yaratilmagan." });
  }
});

// Tizimga kirish (Login)
const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //  1. Email bo‘yicha foydalanuvchini topamiz
  const student = await Student.findOne({ email });

  
  //  2. Agar foydalanuvchi topilsa, parolni tekshiramiz
  if (student && (await student.matchPassword(password))) {
    const accessToken = generateAccessToken(student._id);
    const refreshToken = generateRefreshToken(student._id);

    student.refreshToken = refreshToken;
    await student.save();

    res.status(200).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(401).json({ message: "Email yoki parol noto‘g‘ri!" });
  }
});

module.exports = {refreshToken, registerStudent, loginStudent };
