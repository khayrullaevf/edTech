const express = require("express");
const { getCourses, createCourse,updateCourse,deleteCourse,enrollStudent,getPopularCourses,getCourseAverageProgress } = require("../controllers/courseController");
const { protect, admin } = require("../middlewares/authMiddleware"); // Admin middleware
const router = express.Router();

router.get("/", getCourses);  // Barcha kurslarni olish
router.post("/",protect,admin, createCourse); // Yangi kurs qo‘shish
router.put("/:id",protect,admin, updateCourse); // Kurs ma’lumotlarini yangilash
router.delete("/:id",protect,admin, deleteCourse); // Kursni o‘chirish

router.post("/enroll", enrollStudent); //Talabani kursga yozish
router.get("/popular", getPopularCourses); //  Ommabop kurslar
router.get("/:courseId/average-progress", getCourseAverageProgress); // O‘rtacha progressni olish



module.exports = router;
