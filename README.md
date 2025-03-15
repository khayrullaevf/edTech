# EdTech Backend API

Bu loyiha ta'lim platformasi uchun backend server hisoblanadi. Node.js, Express, MongoDB va JWT autentifikatsiyasi ishlatilgan.

## Texnologiyalar
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (JSON Web Token)**
- **Bcrypt.js** (parolni hash qilish uchun)
- **Express-Async-Handler** (async funksiyalarni boshqarish)

## Loyihani Ishga Tushirish

1. **GitHub'dan klonlash**
   ```bash
   git clone https://github.com/your-repository.git
   cd your-repository
   ```

2. **Kerakli paketlarni o‘rnatish**
   ```bash
   npm install
   ```

3. **.env faylini yaratish va sozlash**
   ```
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Serverni ishga tushirish**
   ```bash
   npm start
   ```
   Yoki hot-reload bilan:
   ```bash
   npm run dev
   ```

## API Yo‘nalishlari (Routes)

### 1. Autentifikatsiya (Auth)
| Yo‘nalish | Metod | Tavsif |
|-----------|-------|--------|
| `/api/auth/register` | **POST** | Foydalanuvchini ro‘yxatdan o‘tkazish |
| `/api/auth/login` | **POST** | Foydalanuvchini tizimga kiritish |

#### 🔹 **Foydalanuvchini ro‘yxatdan o‘tkazish** (`/api/auth/register`)
- **Tana (Body) JSON:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456",
    "role": "admin" // yoki "student"
  }
  ```
- **Javob (Response):**
  ```json
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "token": "JWT_TOKEN"
  }
  ```

#### 🔹 **Foydalanuvchini tizimga kiritish** (`/api/auth/login`)
- **Tana (Body) JSON:**
  ```json
  {
    "email": "john@example.com",
    "password": "123456"
  }
  ```
- **Javob (Response):**
  ```json
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "token": "JWT_TOKEN"
  }
  ```

---
### 2. Kurslar (Courses)
| Yo‘nalish | Metod | Tavsif |
|-----------|-------|--------|
| `/api/courses` | **GET** | Barcha kurslarni olish |
| `/api/courses` | **POST** | Yangi kurs qo‘shish (Admin) |
| `/api/courses/:id` | **PUT** | Kursni yangilash (Admin) |
| `/api/courses/:id` | **DELETE** | Kursni o‘chirish (Admin) |

#### 🔹 **Barcha kurslarni olish** (`GET /api/courses`)
- **Javob (Response):**
  ```json
  [
    {
      "_id": "course_id",
      "title": "React JS Dasturlash",
      "description": "Frontend uchun asosiy kurs",
      "studentsEnrolled": []
    }
  ]
  ```

#### 🔹 **Yangi kurs yaratish (Admin)** (`POST /api/courses`)
- **Tana (Body) JSON:**
  ```json
  {
    "title": "Node.js Dasturlash",
    "description": "Backend kursi"
  }
  ```
- **Admin token kerak (Headers):**
  ```
  Authorization: Bearer JWT_TOKEN
  ```
- **Javob (Response):**
  ```json
  {
    "_id": "course_id",
    "title": "Node.js Dasturlash",
    "description": "Backend kursi",
    "studentsEnrolled": []
  }
  ```

---
### 3. Talabalar (Students)
| Yo‘nalish | Metod | Tavsif |
|-----------|-------|--------|
| `/api/students` | **GET** | Barcha talabalarni olish |
| `/api/students/:id` | **GET** | Bitta talabani olish |
| `/api/students/enroll` | **POST** | Talabani kursga yozish |

#### 🔹 **Talabani kursga yozish** (`POST /api/students/enroll`)
- **Tana (Body) JSON:**
  ```json
  {
    "studentId": "student_id",
    "courseId": "course_id"
  }
  ```
- **Javob (Response):**
  ```json
  {
    "message": "Talaba kursga muvaffaqiyatli yozildi"
  }
  ```

---
### 4. Admin Routes
| Yo‘nalish | Metod | Tavsif |
|-----------|-------|--------|
| `/api/admin/users` | **GET** | Barcha foydalanuvchilarni olish (Admin) |
| `/api/admin/make-admin/:id` | **PUT** | Foydalanuvchini admin qilish |

#### 🔹 **Foydalanuvchini admin qilish** (`PUT /api/admin/make-admin/:id`)
- **Admin token kerak (Headers):**
  ```
  Authorization: Bearer JWT_TOKEN
  ```
- **Javob (Response):**
  ```json
  {
    "message": "Foydalanuvchi admin qilindi"
  }
  ```

## Xulosa
Bu API **ta’lim platformasi** uchun mo‘ljallangan bo‘lib, foydalanuvchilar ro‘yxatdan o‘tishi, tizimga kirishi, kurslarga yozilishi va admin tomonidan boshqarilishi mumkin.

Agar loyiha bo‘yicha savollaringiz bo‘lsa, GitHub Issues orqali murojat qilishingiz mumkin. ✅

