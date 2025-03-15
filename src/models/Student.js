const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  role: {
    type: String,
    enum: ["student", "admin"], // Faqat "student" yoki "admin" bo‘lishi mumkin
    default: "student",
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  progress: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      percentage: { type: Number, default: 0 },
    },
  ],
});




//Parolni hash qilish (saqlashdan oldin)
StudentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  //JWT Token yaratish
  StudentSchema.methods.generateAuthToken = function () {
    return jwt.sign(
      { id: this._id, email: this.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" } // 30 kun amal qiladi
    );
  };
  
  // Kiritilgan parolni tekshirish
  StudentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const Student = mongoose.model("Student", StudentSchema);
  module.exports = Student;
