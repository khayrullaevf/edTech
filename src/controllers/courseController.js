const Course = require("../models/Course"); // Kurs modeli
const Student = require("../models/Student");//Student modeli
const { protect, admin } = require("../middlewares/authMiddleware"); // Admin middleware


//  Barcha kurslarni olish
const getCourses = async (req, res) => {
    try {
      const courses = await Course.find().populate("enrolledStudents");
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik!" });
    }
  };
  
  
  

// Yangi kurs yaratish
const createCourse = async (req, res) => {
    const { name, description, price } = req.body;
  
    try {
      const course = new Course({ name, description, price });
      await course.save();
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ message: "Kursni yaratishda xatolik" });
    }
  };

//  Kursni yangilash
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCourse) return res.status(404).json({ message: "Kurs topilmadi!" });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Kursni yangilashda xatolik!" });
  }
};

// Kursni o‘chirish
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) return res.status(404).json({ message: "Kurs topilmadi!" });
    res.status(200).json({ message: "Kurs o‘chirildi!" });
  } catch (error) {
    res.status(500).json({ message: "Kursni o‘chirishda xatolik!" });
  }
};




// Talabani kursga yozish

const enrollStudent = async (req, res) => {
    try {
      const { courseId, studentId } = req.body; // JSON dan kurs va student ID larini olish
  
      const course = await Course.findById(courseId);
      if (!course) return res.status(404).json({ message: "Kurs topilmadi" });
  
      const student = await Student.findById(studentId);
      if (!student) return res.status(404).json({ message: "Talaba topilmadi" });
  
      //  Agar talaba allaqachon kursga yozilgan bo‘lsa, xatolik qaytaramiz
      if (course.enrolledStudents.includes(studentId)) {
        return res.status(400).json({ message: "Bu talaba allaqachon kursga yozilgan!" });
      }
  
      // Agar talaba yozilmagan bo‘lsa, kursga qo‘shamiz
      course.enrolledStudents.push(studentId);
      await course.save();
  
      res.status(200).json({ message: "Talaba kursga yozildi!", course });
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik!", error });
    }
  };
  
//Ommabop kurslarni olamiz
  const getPopularCourses = async (req, res) => {
    try {
      //  Kurslarni enroll bo‘lgan talabalar soni bo‘yicha kamayish tartibida saralash
      const courses = await Course.find()
        .populate("enrolledStudents") // Talabalar ma’lumotlarini olish
        .sort({ enrolledStudents: -1 }) // Eng ko‘p yozilgan kurs birinchi chiqadi
        .limit(5); // Faqat TOP 5 kursni chiqarish
  
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik!", error });
    }
  };
  

  //O'rtacha progressni olamiz
  const getCourseAverageProgress = async (req, res) => {
    try {
      const { courseId } = req.params;
  
      // 🔹 Kursga yozilgan barcha talabalarni progressi bilan topamiz
      const students = await Student.find({ "progress.course": courseId });
  
      if (students.length === 0) {
        return res.status(404).json({ message: "Bu kursga hech kim yozilmagan" });
      }
  
      // Umumiy progress va talaba sonini hisoblaymiz
      let totalProgress = 0;
      let studentCount = 0;
  
      students.forEach(student => {
        const progressData = student.progress.find(p => p.course.toString() === courseId);
        if (progressData) {
          totalProgress += progressData.percentage;
          studentCount++;
        }
      });
  
      //  O‘rtacha progressni hisoblaymiz
      const averageProgress = studentCount > 0 ? totalProgress / studentCount : 0;
  
      res.status(200).json({
        courseId,
        averageProgress: averageProgress.toFixed(2) + "%" // 2 xonali kasr qismi bilan
      });
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik!", error });
    }
  };
  



module.exports = { getCourses, createCourse, updateCourse, deleteCourse,enrollStudent ,getPopularCourses,getCourseAverageProgress};
