# Employee Management System  
FSE Internship – Test Case Assignment  

## 📌 1. Project Overview  
Employee Management System adalah aplikasi **Fullstack** yang digunakan untuk mengelola data karyawan.  
Aplikasi ini dibangun untuk memenuhi requirement FSE Internship Test Case, yang mencakup:

- Backend REST API  
- Frontend UI untuk CRUD  
- Database PostgreSQL  
- Containerization menggunakan Docker  
- Dokumentasi lengkap  

### 🛠 Tech Stack  
**Backend:** Node.js + Express  
**Frontend:** React  
**Database:** PostgreSQL  
**Containerization:** Docker & Docker Compose  
**Other:** Axios, CORS  

### ✨ Features Implemented
- CRUD Employee  
- Detail validation  
- Unique email constraint  
- Status active/inactive  
- Responsive UI  
- API integrated with database  
- Dockerized fullstack setup  

---

## 📌 2. Prerequisites  

Pastikan software berikut sudah terinstall:

- **Docker** (WAJIB)  
- **Docker Compose**  
- Node.js (opsional, hanya jika ingin menjalankan tanpa Docker)

### Minimum System Requirements:
- RAM: 4GB  
- Storage: 500MB  
- OS: Windows / MacOS / Linux  

---

## 📌 3. Installation & Setup  

### **1️⃣ Clone Repository**
```sh
git clone https://github.com/adun123/employees-management.git

cd employee-management
```

### **2️⃣ Install Dependencies (Optional, if not using Docker)**  
Backend:
```sh
cd backend
npm install
```

Frontend:
```sh
cd frontend
npm install
```

### **3️⃣ Configure Environment Variables**

Buat file `.env` di folder **backend**:

```
PORT=4000
DATABASE_URL=postgresql://postgres:root@postgres:5432/employees_db
```

Buat file `.env.example` untuk kebutuhan submission:

```
PORT=4000
DATABASE_URL=postgresql://<username>:<password>@<host>:5432/employees_db
```

### **4️⃣ Run Application with Docker Compose (Recommended)**  
Dari root directory:

```sh
docker-compose up --build
```

### **5️⃣ Access the Application**
Frontend:
```
http://localhost:3000
```

Backend API:
```
http://localhost:4000/api/employees
```

---

## 📌 4. API Documentation

### **GET /api/employees**
Ambil semua karyawan  
```sh
curl http://localhost:4000/api/employees
```

### **GET /api/employees/:id**
```sh
curl http://localhost:4000/api/employees/1
```

### **POST /api/employees**
```json
{
  "name": "John Doe",
  "email": "john@mail.com",
  "position": "Engineer",
  "department": "IT",
  "salary": 7000,
  "hire_date": "2024-01-12",
  "status": "active"
}
```

Curl:
```sh
curl -X POST http://localhost:4000/api/employees \
-H "Content-Type: application/json" \
-d '{...}'
```

### **PUT /api/employees/:id**
```sh
curl -X PUT http://localhost:4000/api/employees/1 \
-H "Content-Type: application/json" \
-d '{"salary": 9000}'
```

### **DELETE /api/employees/:id**
```sh
curl -X DELETE http://localhost:4000/api/employees/1
```

---

## 📌 5. Project Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── models/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── database/
│   └── init.sql
│
├── docker-compose.yml
├── .env.example
├── README.md
└── screenshots/
```

---

## 📌 6. Screenshots (UI Preview)



- Dashboard view  
- Employee list  
- Add employee form  
- Edit employee form  



## 📌 7. Challenges & Solutions  

### ❗ Challenge 1: Backend tidak bisa connect ke PostgreSQL di Docker  
**Solution:**  
Gunakan hostname internal Docker Compose:  
```
DB_HOST=postgres
```

---

### ❗ Challenge 2: CORS Error saat frontend memanggil backend  
**Solution:**  
Tambahkan konfigurasi CORS di Express:
```js
app.use(cors({
  origin: "http://localhost:3000"
}));
```

---

### ❗ Challenge 3: Email harus unique → error saat insert  
**Solution:**  
Tambahkan try/catch dan PostgreSQL unique constraint.

---

## 📌 8. Future Improvements  
- Authentication (login/logout)  
- Role-based access  
- Pagination on employee list  
- Graph-based dashboard  
- Export data (CSV, PDF)  

---

## 🎉 Final Notes  
Aplikasi ini memenuhi semua aspek penilaian:

✔ Backend Development  
✔ Frontend CRUD UI  
✔ Full Stack Integration  
✔ Docker Containerization  
✔ Database Initialization  
✔ Professional Documentation  
✔ Clean Repository Structure  

---

# 🚀 Thank You!  
Jika ada pertanyaan atau perlu revisi tambahan, silakan hubungi saya.

