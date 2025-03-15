# EdTech Platform Backend

Bu loyiha talabalarga kurslarga yozilish va o'z progresslarini kuzatish imkonini beruvchi backend API hisoblanadi. Node.js, Express, MongoDB, JWT autentifikatsiyasi va role-based authentication ishlatilgan.

## 1. O'rnatish va Ishga Tushirish

### Talablar:
- Node.js o‘rnatilgan bo‘lishi kerak
- MongoDB o‘rnatilgan bo‘lishi yoki cloud MongoDB (Atlas) ishlatilishi kerak

### O'rnatish:
```sh
# Repository-ni klonlash
git clone https://github.com/khayrullaevf/edtech-backend.git
cd edtech-backend

# NPM paketlarni o'rnatish
npm install

# Environment variables yaratish
cp .env.example .env
```

`.env` fayliga quyidagilarni kiriting:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Serverni ishga tushirish:
```sh
npm run dev
```

## 2. Foydalanuvchi autentifikatsiyasi (Auth Routes)

| Yo‘nalish | Metod | Tavsif |
|-----------|--------|-------------------------------|
| /api/auth/register | POST | Yangi foydalanuvchini ro‘yxatdan o‘tkazish |
| /api/auth/login | POST | Foydalanuvchini tizimga kiritish |
| /api/auth/refresh-token | POST | Refresh token orqali yangi access token olish |

### 🔹 Ro‘yxatdan o‘tish (POST /api/auth/register)
#### So‘rov (Request):
```json
{
  "name": "Fazliddin",
  "email": "fazliddin@example.com",
  "password": "123456",
  "role": "admin" // yoki "student"
}
```
#### Javob (Response):
```json
{
  "_id": "user_id",
  "name": "Fazliddin",
  "email": "fazliddin@example.com",
  "role": "admin",
  "token": "JWT_ACCESS_TOKEN"
}
```

## 3. Kurslar (Course Routes)

| Yo‘nalish | Metod | Tavsif |
|-----------|--------|------------------------------|
| /api/courses | GET | Barcha kurslarni olish |
| /api/courses/:id | GET | Bitta kursni olish |
| /api/courses | POST | Yangi kurs yaratish (faqat admin) |
| /api/courses/:id | PUT | Kursni tahrirlash (faqat admin) |
| /api/courses/:id | DELETE | Kursni o‘chirish (faqat admin) |

### 🔹 Kurs yaratish (POST /api/courses)
Admin token kerak (Headers):
```json
{
  "Authorization": "Bearer JWT_TOKEN"
}
```
#### So‘rov (Request):
```json
{
  "title": "JavaScript Asoslari",
  "description": "JavaScript dasturlash tiliga kirish kursi.",
  "duration": 6
}
```
#### Javob (Response):
```json
{
  "_id": "course_id",
  "title": "JavaScript Asoslari",
  "description": "JavaScript dasturlash tiliga kirish kursi.",
  "duration": 6
}
```

## 4. Talabalar (Student Routes)

| Yo‘nalish | Metod | Tavsif |
|-----------|--------|--------------------------------|
| /api/students | GET | Barcha talabalarni olish |
| /api/students/:id | GET | Bitta talabani olish |
| /api/students/:id | PUT | Talaba ma'lumotlarini tahrirlash |
| /api/students/:id | DELETE | Talabani o‘chirish |

### 🔹 Talaba ma'lumotlarini olish (GET /api/students/:id)
#### Javob (Response):
```json
{
  "_id": "student_id",
  "name": "Ali Valiyev",
  "email": "ali@example.com",
  "enrolledCourses": [
    {
      "_id": "course_id",
      "title": "JavaScript Asoslari",
      "progress": 80
    }
  ]
}
```

## 5. Kursga yozilish (Enroll Routes)

| Yo‘nalish | Metod | Tavsif |
|-------------------|--------|---------------------------------|
| /api/enroll | POST | Talabani kursga yozish |
| /api/enroll/progress | PUT | Talabaning progressini yangilash |

### 🔹 Kursga yozilish (POST /api/enroll)
#### So‘rov (Request):
```json
{
  "studentId": "student_id",
  "courseId": "course_id"
}
```
#### Javob (Response):
```json
{
  "message": "Talaba kursga yozildi!"
}
```

## 6. Xavfsizlik (Authentication & Authorization)
- JWT orqali autentifikatsiya
- Admin va student rollari
- Token orqali himoyalangan marshrutlar

## 7. API Hujjatlari
Swagger yoki Postman collection orqali test qilishingiz mumkin.

---
Loyiha ochiq manba va istalgan hissa qo‘shishingiz mumkin. 🚀

