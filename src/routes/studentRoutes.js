const express = require("express");
const { getStudents, createStudent, updateStudent, deleteStudent,updateProgress, getStudentProgress, getStudentCompletedCourses} = require("../controllers/studentController");

const router = express.Router();

router.get("/", getStudents); // Barcha talabalarni olish
router.post("/", createStudent); // Yangi talaba qo‘shish
router.put("/:id", updateStudent); // Talabani yangilash
router.delete("/:id", deleteStudent); // Talabani o‘chirish
router.post("/update-progress", updateProgress); // Talaba progressini yangilash
router.get("/:studentId/progress", getStudentProgress); //Talaba progressini olish
router.get("/:studentId/completed-courses", getStudentCompletedCourses); //Talaba progressini olish

module.exports = router;
