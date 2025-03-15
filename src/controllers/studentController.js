const Student = require("../models/Student");
const Course=require('../models/Course')

// Barcha talabalarni olish
const getStudents = async (req, res) => {
    try {
      const students = await Student.find().populate({
        path: "enrolledCourses",
        select: "title description price" 
      });
  
      res.status(200).json(students);
    } catch (error) {
      console.error("Xatolik:", error);
      res.status(500).json({ message: "Serverda xatolik!", error });
    }
  };
  
// Yangi talaba qo‘shish
const createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newStudent = new Student({ name, email, age });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Talaba yaratishda xatolik!" });
  }
};

// Talabani yangilash
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ message: "Talaba topilmadi!" });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Talabani yangilashda xatolik!" });
  }
};

// Talabani o‘chirish
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) return res.status(404).json({ message: "Talaba topilmadi!" });
    res.status(200).json({ message: "Talaba o‘chirildi!" });
  } catch (error) {
    res.status(500).json({ message: "Talabani o‘chirishda xatolik!" });
  }
};

const updateProgress = async (req, res) => {
    try {
      const { studentId, courseId, percentage } = req.body;
  
      const student = await Student.findById(studentId);
      if (!student) return res.status(404).json({ message: "Talaba topilmadi" });
  
      //  Kursning progressini topamiz
      const courseProgress = student.progress.find(p => p.course.toString() === courseId);
  
      if (courseProgress) {
        //  Agar progress mavjud bo‘lsa, foizni yangilaymiz
        courseProgress.percentage = percentage;
      } else {
        //  Agar kurs progressi mavjud bo‘lmasa, yangi entry qo‘shamiz
        student.progress.push({ course: courseId, percentage });
      }
  
      await student.save();
      res.status(200).json({ message: "Progress yangilandi!", student });
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik!", error });
    }
  };
  
  const getStudentProgress = async (req, res) => {
    try {
      const { studentId } = req.params;
  
      const student = await Student.findById(studentId)
        .populate({
          path: "progress.course", // Kurs ma'lumotlarini olish
          select: "title description price" // Faqat kerakli maydonlarni olish
        });
  
      if (!student) return res.status(404).json({ message: "Talaba topilmadi" });
  
      res.status(200).json({
        student: {
          _id: student._id,
          name: student.name,
          email: student.email,
          progress: student.progress
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik!", error });
    }
  };

  const getStudentCompletedCourses = async (req, res) => {
    try {
      const { studentId } = req.params;
  
      //  Talabani kurs progresslari bilan topamiz
      const student = await Student.findById(studentId).populate("progress.course");
  
      if (!student) {
        return res.status(404).json({ message: "Talaba topilmadi" });
      }
  
      // Faqat 80%+ bajarilgan kurslarni olamiz
      const completedCourses = student.progress
        .filter(course => course.percentage >= 80)
        .map(course => ({
          courseId: course.course._id,  // To‘g‘rilandi!
          title: course.course.title,
          description: course.course.description,
          price: course.course.price,
          progress: course.percentage + "%"
        }));
  
      res.status(200).json({
        studentId,
        name: student.name,
        completedCourses
      });
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik!", error });
    }
  };
  
  


module.exports = { getStudents, createStudent, updateStudent, deleteStudent ,updateProgress, getStudentProgress,getStudentCompletedCourses};
