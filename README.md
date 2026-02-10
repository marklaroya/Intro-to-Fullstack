Full Stack MERN

Dashboard App

A simple full-stack web application built **authentication, protected routes, and CRUD operations** using **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.

This project was created as a learning exercise to understand how frontend and backend communicate in a real-world setup.

---

## Features

- User Registration
- User Login
- Protected Dashboard (only accessible when logged in)
- Create, Read, Update, and Delete (CRUD) posts
- Logout functionality
- REST API integration

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Context API (AuthContext)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📁 Project Structure (Backend)
src/
├─ config/                   
│  ├─ constants.js
│  └─ database.js
├─ controller/               
│  ├─ post.controller.js
│  └─ user.controller.js
├─ models/                  
│  ├─ post.controller.js
│  └─ user.model.js
├─ routes/                  
│  └─ post.route.js
│  └─ post.route.js
├─ App.jsx
└─ index.jsx

---

## 📁 Project Structure (Frontend)

src/
├─ api/                # API calls (Axios)
│  ├─ postApi.js
│  └─ userApi.js
├─ Auth/               # Authentication pages
│  ├─ Login.jsx
│  └─ Register.jsx
├─ components/         # Reusable components
│  ├─ Navbar.jsx
│  ├─ ProtectedRoute.jsx
│  └─ StyledWrapper.jsx
├─ context/            # Global state (Auth)
│  └─ AuthContext.jsx
├─ pages/              # Main pages
│  └─ Dashboard.jsx
├─ App.jsx
└─ main.jsx

---

📌 API Endpoints (Backend)
Auth
POST /api/v1/users/register
POST /api/v1/users/login
POST /api/v1/users/logout

Posts
POST /api/v1/posts/create
GET /api/v1/posts/getPosts
PATCH /api/v1/posts/update/:id
DELETE /api/v1/posts/delete/:id

---

🧠 What I Learned

How React Context works for authentication

How protected routes work using React Router

How to connect frontend and backend using Axios

How REST APIs handle CRUD operations

Debugging common frontend/backend issues (CORS, routes, HTTP methods)

---

📸 Screenshots

LogIn
![alt text](image-1.png)

Register
![alt text](image-2.png)

DashBoard
![alt text](image.png)


Author: Lester Laroya


